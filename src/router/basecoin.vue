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
      label="基础币种"
      width="200">
      <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.base_currency }}</el-tag>
          </div>      
      </template>
    </el-table-column>
    <el-table-column
      label="计价币种"
      width="200">
       <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.quote_currency }}</el-tag>
          </div>      
      </template>
    </el-table-column>
    <el-table-column
      label="开盘价"
      width="200">
       <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.closeprice}}</el-tag>
          </div>      
      </template>
    </el-table-column>
      <el-table-column
      label="买入价"
      width="200">
       <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.buyprice}}</el-tag>
          </div>      
      </template>
    </el-table-column>
     <el-table-column
      label="币种接口类型"
      width="200">
       <template slot-scope="scope">     
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.symbol }}</el-tag>
          </div>      
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

  
        <el-dialog title="修改开盘价" :visible.sync="dialogFormVisible">
        <el-form :model="form" :inline="true">
            <el-form-item label="基础币种" :label-width="formLabelWidth">
            <el-input v-model="form.base_currency" auto-complete="off"></el-input>
           </el-form-item>
          <el-form-item label="计价币种" :label-width="formLabelWidth">
            <el-input v-model="form.quote_currency" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="开盘价" :label-width="formLabelWidth">
            <el-input v-model="form.closeprice" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="币种接口类型" :label-width="formLabelWidth">
            <el-input v-model="form.symbol" auto-complete="off"></el-input>
           </el-form-item>
             <el-form-item label="买入价" :label-width="formLabelWidth">
            <el-input v-model="form.buyprice" auto-complete="off"></el-input>
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
            <el-form-item label="基础币种" :label-width="formLabelWidth">
            <el-input v-model="form.base_currency" auto-complete="off"></el-input>
           </el-form-item>
          <el-form-item label="计价币种" :label-width="formLabelWidth">
            <el-input v-model="form.quote_currency" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="开盘价" :label-width="formLabelWidth">
            <el-input v-model="form.closeprice" auto-complete="off"></el-input>
           </el-form-item>
            <el-form-item label="币种接口类型" :label-width="formLabelWidth">
            <el-input v-model="form.symbol" auto-complete="off"></el-input>
           </el-form-item>
             <el-form-item label="买入价" :label-width="formLabelWidth">
            <el-input v-model="form.buyprice" auto-complete="off"></el-input>
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
import {getAllCoin,deleteOneCoin,editOneCoin,getOneCoin,addOneCoin} from "../api/api"
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
            "closeprice":"",
            "base_currency":"",
            "quote_currency":"",
            "symbol":"",
            "buyprice":""
          },
          
      }
    },
    methods: {
     add(){
         this.form={
          "closeprice": "",
          "base_currency":"",
          "quote_currency":"",
          "symbol":"",
          "buyprice":""
       };
        this.addormVisible=true;
     },
     saveadd(){
       addOneCoin(this.form).then(res=>{
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
      editOneCoin(nObj).then(res=>{
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
        getAllCoin({"pagesize":pagesize,"contpage":contpage}).then(res=>{
         if(res.data.success){
         this.tableData=res.data.list
         this.Totle=res.data.totle
         }
       })
      },  
      handleCurrentChange(currentPage) {
        this.changePage(15,currentPage)
      },
      handleDelete(id) {
          deleteOneCoin({"id":id}).then(res=>{
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
           getOneCoin({"id":this.seletcid}).then(res=>{
             this.form={
                    "closeprice": res.data.data[0].closeprice,
                    "base_currency":res.data.data[0].base_currency,
                    "quote_currency":res.data.data[0].quote_currency,
                    "symbol":res.data.data[0].symbol,
                    "buyprice":res.data.data[0].buyprice
                 }
         })
      }
    },
    created(){
      this.changePage(15,1)
    }
  }
</script>