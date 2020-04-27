<template>
    <div>
        <el-container>
            <el-header>
                <router-link :to="{ name: 'BrandsNew'}">
                    <el-button type="success" icon="el-icon-edit">新增</el-button>
                </router-link>
                <el-button type="success" icon="el-icon-edit">导出</el-button>
            </el-header>

            <el-main class="table_main">
                <el-table :data="brands"  tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="id" label="品牌ID" width="80"></el-table-column>
                    <el-table-column label="缩略图" width="180">
                        <template slot-scope='scope'>
                            <img :src="scope.row.image" alt="" width="50">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="品牌名称" width="120"></el-table-column>
                    <el-table-column prop="url" label="品牌网址" width="200"></el-table-column>
                    <el-table-column prop="description" label="描述信息" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sort_order" label="排序" width="80">
                    </el-table-column>

                    <el-table-column label="是否显示">
                        <template slot-scope="scope">
                            <!--<i class="el-icon-edit"></i>-->
                            <i :class="scope.row.is_show | checkOrClose"></i>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>

                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-main>

            <el-footer>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :page-size="page.pageSize"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                brands: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    current_page: 1
                },
                json_fields: {
                    '测试号': 'name',
                    '地址': 'url',
                    '图片地址': 'image',
                },
            }
        },
        filters: {
            checkOrClose(value) {
                return value ? 'el-icon-check' : 'el-icon-close'
            }
        },
        //页面加载之前执行的方法
        created() {
            this.init_()
        },
        methods: {
            init_(){
                axios.get(`http://localhost:8000/admin/shop/brands?page=${this.page.current_page}`).then(response => {
                    console.log(response)
                    let brands = response.data.data.brands
                    this.brands = brands.data
                    this.page = {
                        total: brands.total,
                        pageSize: brands.per_page,
                        current_page: brands.current_page
                    }
                })
            },
            async fetchData() {
                return this.brands
            },
            startDownload() {
                alert('show loading');
            },
            finishDownload() {
                alert('hide loading');
            },
            init() {
                // 解决每页最后一条删除后不跳往前一页
                //如果删除某一页的最后一条，则判断（是否还有前一页，是不是最后一条）
                axios.get(`http://localhost:8000/admin/shop/brands?page=${this.page.current_page}`).then(response => {
                    console.log(response.data.data.brands.data)
                    let last_delete = response.data.data.brands.data.length
                    if(last_delete == 0 && this.page.current_page > 1){
                        this.page.current_page -= 1
                        this.init_()
                    }else{
                        this.init_()
                    }
                })
            },

            /**
             *  分页控件
             *  **/
            handleCurrentChange(val) {
                this.page.current_page = val
                this.init_()
            },
            /**
             *  编辑传参
             *  *  **/
            handleEdit(index, row) {
                console.log(index,row)
                this.$router.push({name: 'BrandsEdit', params: {id: row.id}});
            },

            /**
             *  删除
             *  *  **/
            handleDelete(index, row) {

                console.log(index, row.id)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    axios.delete(`http://localhost:8000/admin/shop/brands/${row.id}`).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init()
                    })


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


                // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     //异步操作
                //     axios.delete(`http://localhost:8000/admin/shop/brands/${row.id}`).then(res => {
                //         this.$message({
                //             type: 'success',
                //             message: '删除成功!'
                //         });
                //         this.init()
                //     })
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '已取消删除'
                //     });
                // });
            },

            /**
             *  是否显示
             *  *  **/
            changeAttr(row, attr) {
                axios.patch(`http://localhost:8000/admin/brands/is_something`, {
                    id: row.id,
                    attr: attr
                }).then(response => {
                    row.is_show = !row.is_show
                })
            },
        }
    }
</script>


<style scoped>
    .el-header {
        text-align: left;
        padding: 20px 0 50px 30px;
        background-color: #fff;
    }

    .el-pagination {
        margin-top: 30px;
    }

    .table_main > .el-table {
        text-align: center;
    }

    .thumb {
        max-width: 50px;
    }

    i {
        cursor: pointer;
    }

    .el-icon-check {
        color: green;
        font-weight: bold;
    }

    .el-icon-close {
        color: red;
        font-weight: bold;
    }


</style>
