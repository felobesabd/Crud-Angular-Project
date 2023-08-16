import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserRes } from '../../content/tasks';
import { TasksService } from '../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { TaskDetailsComponent } from '../task-details/task-details.component';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
  image: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})

export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource: any = [];
  tasksFilter!: FormGroup;
  userData!: UserRes;
  selectedStatus: string = "In-Progress"
  page: any = 1;
  total: number = 1;

  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]


  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private ser: TasksService,
    private toster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createform()
    this.getAllUser()
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  getAllUser() {
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]))
    console.log(this.userData);
  }

  getAllTasks() {
    let params = {
      page: this.page,
      limit: 8,
      status: this.selectedStatus
    }
    this.ser.getAllTasksUserService(this.userData.userId!, params).subscribe((res: any) => {
      this.total = res.tasks.length
      console.log(this.total);
      this.dataSource = res.tasks;
      if (res.tasks.length === 0) {
        this.dataSource = [];
      }
    })
  }

//// **Pagenation** ////
  pageChange(event: any) {
    this.page = event;
    console.log(this.page);
  }

//// **Complete Tasks** ////
  complete(ele: any) {
    console.log(ele);
    const model = {
      id: ele._id
    };
    this.ser.completeTasksService(model).subscribe((res)=> {
      this.toster.success("Success Completed Task", "Success")
      this.getAllTasks()
    })
  }

  detailsTask(item: any) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width: '750px',
      // disableClose: true
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

}
