<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="更新时间"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.creadt_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="交易对"
      width="200">
      <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.symbol }}</el-tag>
          </div>      
      </template>
    </el-table-column>
    <el-table-column
      label="卖出价"
      width="200">
       <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.low }}</el-tag>
          </div>      
      </template>
    </el-table-column>
    <el-table-column
      label="买入价"
      width="200">
       <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.height}}</el-tag>
          </div>      
      </template>
    </el-table-column>
      <el-table-column
      label="是否禁用"
      width="200">
       <template slot-scope="scope">    
         <el-switch
            v-model="scope.row.abled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope.row.abled,scope.row._id)">
          </el-switch> 
              
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row._id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

 <div style="margin: 20px">
    <el-button @click="add()">新增</el-button> 
  </div>  

  <el-row>
    <el-col :span="24">
     <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="Totle">
    </el-pagination>
    </el-col>
  </el-row>
        <el-dialog title="修改策略" :visible.sync="dialogFormVisible">
        <el-form :model="form" :inline="true">
            <el-form-item label="交易对" :label-width="formLabelWidth">
            <el-input v-model="form.symbol" auto-complete="off"></el-input>
           </el-form-item>
          <el-form-item label="买入幅度" :label-width="formLabelWidth">
            <el-input v-model="form.low" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="卖出幅度" :label-width="formLabelWidth">
            <el-input v-model="form.height" auto-complete="off"></el-input>
           </el-form-item>
          
         </el-form>
         
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit()">确 定</el-button>
        </div>
        </el-dialog>
      
    <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="addormVisible">
        <el-form :model="form" :inline="true">
          <el-form-item label="交易对" :label-width="formLabelWidth">
            <el-input v-model="form.symbol" auto-complete="off"></el-input>
           </el-form-item>
          <el-form-item label="买入幅度" :label-width="formLabelWidth">
            <el-input v-model="form.low" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="卖出幅度" :label-width="formLabelWidth">
            <el-input v-model="form.height" auto-complete="off"></el-input>
           </el-form-item>
          
         </el-form>
         
        <div slot="footer" class="dialog-footer">
            <el-button @click="addormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveadd()">确 定</el-button>
        </div>
        </el-dialog>

  </div>
</template>

<script>
import {getAllTactics,getOneTactics,deleteOneTactics,editOneTactics,addOneTactics,updataAbleTactics} from "../api/api"
  export default {
    data() {
      return {
          tableData: [],
          Totle:0,
          currentPage: 1,
          dialogFormVisible:false,
          addormVisible:false,
          formLabelWidth: '100px',
          seletcid:"",
          form:{
            "symbol":"",
            "height":"",
            "low":"",
          },
          
      }
    },
    methods: {
     add(){
         this.form={
            "symbol":"",
            "height":"",
            "low":"",
       };
        this.addormVisible=true;
     },
     saveadd(){
       addOneTactics(this.form).then(res=>{
         if(res.data.success){
             this.addormVisible=false;
             this.changePage(15,this.currentPage);
              this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
         }else{
            this.$message.error('添加失败');
         }
       })
     },
     submitEdit(){ 
      var nObj = Object.assign({},{"id":this.seletcid},this.form);
      editOneTactics(nObj).then(res=>{
                 if(res.data.success){
                this.dialogFormVisible=false;
                this.changePage(15,this.currentPage)
                 this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
             }else{
               this.$message.error('修改失败');
             }
         })
       
        
     },
      changePage(pagesize,contpage){
        getAllTactics({"pagesize":pagesize,"contpage":contpage}).then(res=>{
          console.log(res)
         if(res.data.success){
         this.tableData=res.data.list
         this.Totle=res.data.totle
         }
       })
      }, 
      change(value,id){
         updataAbleTactics({"_id":id,"abled":value}).then(res=>{
           console.log(res)
         })
      },
      
      handleCurrentChange(currentPage) {
        this.changePage(15,currentPage)
      },
      handleDelete(id) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
        }).then(res=>{

          return deleteOneTactics({"id":id})
        }).then(res=>{
             if(res.data.success){
                   this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                this.changePage(15,this.currentPage)
              }else{
                   this.$message.error('删除失败');
              }
        })

      },
         handleEdit(id) {
           this.seletcid= id
           this.dialogFormVisible=true;
           getOneTactics({"id":this.seletcid}).then(res=>{
             this.form={
                    "symbol": res.data.data[0].symbol,
                    "height":res.data.data[0].height,
                    "low":res.data.data[0].low,
                 }
         })
      }
    },
    created(){
      this.changePage(15,1)
    }
  }
</script>