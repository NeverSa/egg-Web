<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="创建时间"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.creadt_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.user_id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.user_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col :span="24">
    <span>{{Totle}} asdasdasdsa </span>  
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="Totle"
      layout="total, prev, pager, next"
      :total="Totle">
    </el-pagination>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import {getUserList} from "../api/api"
  export default {
    data() {
      return {
        tableData: [],
        Totle:"",
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created(){
       getUserList({"pagesize":20,"contpage":1}).then(res=>{
         console.log(res)
         if(res.data.success){
         this.tableData=res.data.list
         this.Totle=res.data.totle
         }
       })
    }
  }
</script>