<template>
	<div>

		<h2>品牌管理</h2>

		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
		  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
		  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            <el-button type="success" icon="el-icon-edit">导出</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="jump">新增</el-button>
		</el-breadcrumb>

  <el-table
    :data="TB"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.created_at.substring(0,10) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="缩略图"
      width="180">
        <template slot-scope="scope">
            <img :src="scope.row.image" alt="" width="50">
        </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
          label="品牌网址"
          width="180>">
      <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        TB: [],
        currentPage1: 1
      }
    },
    created(){
        axios.get(`http://localhost:8000/admin/shop/brands`).then(res=>{
            this.TB = res.data.data.brands.data
            console.log(this.TB)

        })
    },
    methods: {
        jump(){
            this.$router.push({ path:'/sbform'})
        },

        handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.TB.splice(index,1)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.handleCurrentChange(this.currentPage1)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        // this.currentChangepage(this.TB,val)
      },
      // currentChangePage(list,currentPage) {
      //   let from = (currentPage - 1) * this.pageSize;
      //   let to = currentPage * this.pageSize;
      //   this.tempList = [];
      //   for (; from < to; from++) {
      //     if (list[from]) {
      //       this.tempList.push(list[from]);
      //     }
      //   }
      // }
    }
  }
</script>

<style>
    .el-breadcrumb{
        line-height:40px;
    }
    .el-breadcrumb .el-button{
        float:right;
        margin-right: 5px
    }
  .cell{
    text-align: center;
  }
</style>
