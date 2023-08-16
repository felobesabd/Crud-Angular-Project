import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from 'projects/admin/src/Models/Tasks';
import * as moment from 'moment';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  newTaskForm!: FormGroup;
  fileName: string = '';
  checkData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<ConfirmationComponent>,
    public matDialog: MatDialog,
    private ser: TasksService,
    private service: UsersService,
  ) {
    this.getAllUserData()
  }

  users: any = [];

  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.newTaskForm = this.fb.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.data?.userId?._id || '', Validators.required],
      image: ['', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [this.data ? this.handleDeadLine() : '', Validators.required],
    });
    this.checkData = this.newTaskForm.value;
  }

  handleDeadLine() {
    let handlerDate = new Date(
      this.data?.deadline.split('-').reverse().join('-')
    ).toISOString();
    return handlerDate;
  }

  selectImage(event: any) {
    this.fileName = event.target.value;
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  setFormTasks() {
    let model = this.handleFormData();

    const observe = {
      next: (res: any) => {
        console.log(res);
        this.dialog.close(true);
      },
      error: (error: any) => {
        console.log(error);
      },
    };

    this.ser.createFormTask(model).subscribe(observe);
  }

  handleFormData() {
    let newData = moment(this.newTaskForm.value['deadline']).format(
      'DD-MM-YYYY'
    );

    const formData = new FormData();

    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newData);
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }

  close() {
    let checkValue = false;
    Object.keys(this.checkData).forEach((item: any) => {
      if (this.checkData[item] !== this.newTaskForm.value[item]) {
        checkValue = true;
      }
    });
    if (checkValue) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '750px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        }
      });
    } else {
      this.dialog.close();
    }
  }

  updateTask() {
    let model = this.handleFormData();

    const observe = {
      next: (res: any) => {
        console.log(res);
        this.dialog.close(true);
      },
      error: (error: any) => {
        console.log(error);
      },
    };

    this.ser.updateTask(model, this.data._id).subscribe(observe);
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
