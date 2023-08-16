import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource = [];
  page: any = 1;
  totalItems: any;


  constructor(private ser:UsersService) {
    this.getAllUserData()
  }
  ngOnInit(): void {
    this.getAllUser()
  }

//// send Data(model) => func(getAllUserDataBSub)
  getAllUser() {
    let model = {
      page: this.page,
      limit: 10,
      name: ''
    }
    this.ser.getAllUserDataBSub(model)
  }

//// subscribtion on => userData(Behavoir Subject)
  getAllUserData() {
    this.ser.userData.subscribe((res: any)=> {
      this.totalItems = res.totalItems
      this.dataSource = res.data,
      console.log(this.totalItems);
      console.log(this.dataSource);
    })
  }

  deleteUser(id: string, numTasks: number) {
    if (numTasks > 0) {
      console.log('nooooooooooo');
    } else {
      this.ser.deleteUserService(id).subscribe((res)=> {
        this.getAllUser()
      })
    }
  }

  statusUser(ele: any) {
    if (ele.assignedTasks > 0) {
      console.log('nooooooooooo');
    } else {
      const model = {
        id: ele._id,
        status: ele.status
      }
      this.ser.getStatusUserService(model).subscribe((res)=> {
        this.getAllUser()
      })
    }
  }

//// **Pagenation** ////
  pageChange(event: any) {
    this.page = event;
    this.getAllUser()
    console.log(this.page);
  }

}
