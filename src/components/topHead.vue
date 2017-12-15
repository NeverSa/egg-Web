<template>
<div class="header_container">
 
    <el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
	</el-breadcrumb>
    <el-dropdown  menu-align='start'>
			<img  class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item  style="color:#000">首页</el-dropdown-item>
				<el-dropdown-item style="color:#000">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
</div>
</template>
<script>
export default {
   
}
</script>
<style lang="less" scoped>
	@import '../public/style/mixin';
	.header_container{
		background-color: #E5E9F2;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
    }
    .el-breadcrumb__item__inner{
         color: #fff !important;
    }
	.el-dropdown-menu__item{
        text-align: center;
        color: #fff;
    }
</style>


