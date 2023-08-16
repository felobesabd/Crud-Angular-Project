import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { User } from 'projects/admin/src/Models/Tasks';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];

  users: any = [];

  status: any = [
    { name: this.translate.instant('tasks.complete'),},
    { name:  this.translate.instant('tasks.inProgress'),},
  ];

  dataSource: any[] = [];
  tasksFilter!: FormGroup;
  timeOutId: any;
  page: any = 1;
  total: any = 1;
  filteration: any = {
    page: this.page,
    limit: 5
  };

  constructor(
    private service: UsersService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private ser: TasksService,
    private translate: TranslateService,
  ) { this.getAllUserData() }

  ngOnInit(): void {
    this.createform();
    this.allTasks();
    this.getAllUser()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

                              // **Search** //
  //// **Search By Key Word** ////
  search(event: any) {
    this.filteration['page'] = 1;
    this.filteration['keyword'] = event.value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.allTasks()
    }, 3000);
  }
  //// **Search By User** ////
  searchByUser(event: User) {
    this.filteration['page'] = 1;
    this.filteration['userId'] = event;
    this.allTasks();
  }
  //// **Search By User** ////
  searchByStatus(event: User) {
    this.filteration['page'] = 1;
    this.filteration['status'] = event;
    this.allTasks();
  }
  //// **Search By Date** ////
  searchByDate(event: any, type: any) {
    this.filteration['page'] = 1;
    this.filteration[type] = moment(event.value).format('DD-MM-YYYY')
    if (type === "toDate" && this.filteration["toDate"] !== "Invalid date") {
      this.allTasks();
    }
  }

                            // **get All Tasks** //
  allTasks() {
    this.ser.getAllTasks(this.filteration).subscribe((res: any) => {
      this.dataSource = this.mapAllTasks(res.tasks);
      this.total = res.totalItems;
      console.log(this.total);
    });
  }

  mapAllTasks(data: any[]) {
    let mapping = data.map((item) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });
    return mapping;
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.allTasks();
      }
    });
  }

                            // **delete Task** //
  deleteItem(id: string) {
    console.log(id);
    this.ser.deleteTask(id).subscribe((res) => {
      this.allTasks();
    });
  }

//// **Update Tasks** ////
  updateItem(element: any) {
    console.log(element);
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.allTasks();
      }
    });
  }

//// **Pagenation** ////
  pageChange(event: any) {
    this.page = event;
    this.filteration['page'] = event;
    this.allTasks()
    console.log(event);
  }

//// send Data(model) => func(getAllUserDataBSub)
getAllUser() {
  this.service.getAllUserDataBSub()
}

//// subscribtion on => userData(Behavoir Subject)
  getAllUserData() {
    this.service.userData.subscribe((res: any)=> {
      this.users = this.mapUsers(res.data)
    })
  }

  mapUsers(data: any[]) {
    let mapping = data?.map(item => {
      return {
        name: item.username,
        id: item._id
      };
    });
    return mapping;
  }

}
