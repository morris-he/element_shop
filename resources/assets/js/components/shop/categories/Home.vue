<template>
    <div>
        <el-header class="header-new">
            <router-link :to="{ name: 'CategoriesNew'}">
                <el-button type="success" icon="el-icon-edit">新增</el-button>
            </router-link>
            <el-button type="info" icon="el-icon-d-caret" @click="showChildren">展开</el-button>
        </el-header>

        <el-table
            :data="categories"
            :tree-props="{ children: 'children' }"
            style="width: 100%"
            row-key="id"
            :key="changing"
            :default-expand-all="expand">
            <el-table-column label="商品 ID" prop="id"></el-table-column>
            <el-table-column label="缩略图" prop="image">
                <template slot-scope="scope">
                    <img
                        :src="scope.row.image==null || scope.row.image=='' ?'':'http://images.canon4ever.com/'+scope.row.image"
                        class="thumb">
                </template>
            </el-table-column>
            <el-table-column label="品牌分类" prop="name"></el-table-column>
            <el-table-column label="是否显示">
                <template slot-scope="scope">
                    <i :class="scope.row.is_show | checkOrclose" @click="changeAttr(scope.row, 'is_show') "></i>
                </template>
            </el-table-column>

            <el-table-column label="排序">
                <template slot-scope="scope">
                    <el-input class="elinput" v-model="scope.row.sort_order" size="small"
                              @change="sort_order(scope.row.id, scope.row.sort_order)"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="描述" prop="description"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>


    export default {
        data() {
            return {
                categories: [],
                expand: false,
                changing: true
            }
        },
        filters: {
            checkOrclose(value) {
                return value ? 'el-icon-check' : 'el-icon-close'
            },
            // checkImage(value){
            //     if(value.substr(0,4)=='http'){
            //         return value
            //     }else if(value==null){
            //         return ''
            //     } else{
            //         return 'http://images.canon4ever.com/'+value
            //     }
            // }
        },
        created() {
            this.init()
        },
        computed: {
            // 计算属性
            expand_word() {
                return this.expand ? "关闭" : "展开"
            }
        },
        methods: {
            init() {
                axios.get(`http://localhost:8000/admin/shop/categories`).then(response => {
                    console.log(response)
                    this.categories = response.data.data.categories
                })
            },
            /**
             *  编辑传参
             *  *  **/
            handleEdit(index, row) {
                this.$router.push({name: 'CategoriesEdit', params: {id: row.id}});
            },


            /**
             *  删除
             *  *  **/
            handleDelete(index, row, parent = '') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(row)
                    axios.delete(`http://localhost:8000/admin/shop/categories/${row.id}`).then((response) => {
                        console.log(response.data.success)
                        // if (!response.data.success) {
                        //     this.$message.error(response.data.msg);
                        //     return
                        // }
                        // parent = parent || this.categories
                        // if(!parent){
                        //     parent= this.categories;
                        // }
                        // if(parent==null||parent==""||parent==undefined){
                        //     parent=this.categories;
                        // }
                        // parent.splice(index, 1)
                        // this.categories.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.init()

                    })
                })
            },
            /**
             *  展开显示
             *  *  **/
            showChildren() {
                //显示变成true
                this.expand = !this.expand
                //当前变拿掉的表格是展开属性为false的那个
                this.changing = false
                //等待dom更新之后去做的事情
                this.$nextTick(()=>{
                //让展开属性为true的那个表格 出现
                    this.changing = true
                })
            },
            /**
             *  是否显示
             *  *  **/
            changeAttr(row, attr) {
                axios.patch(`http://localhost:8000/admin/shop/categories/is_something`, {
                    id: row.id,
                    attr: attr
                }).then(response => {
                    row.is_show = !row.is_show
                })
            },

            /**
             *  排序
             *  *  **/
            sort_order(id, sort_order_value) {
                console.log(id, sort_order_value)
                axios.patch(`http://localhost:8000/admin/shop/categories/sort_order`, {id: id, sort_order: sort_order_value})
                    .then(response => {
                        //被排序的数据
                        console.log(response)
                        this.categories = response.data.data.categories
                    })
                    .catch(error => {
                    console.log(error)
                    if (error.response && error.response.status == "422") {
                        this.$message.error("填写的排序不正确！必须是0~99的数字！")
                    }
                });
            },
        }
    }

</script>

<style>

    .el-main {
        line-height: 40px;
    }

    .el-pagination {
        margin-top: 30px;
    }

    .table_main > .el-table {
        text-align: center;
    }

    .thumb {
        max-width: 100px;
    }

    .el-table__expanded-cell[class*=cell] {
        padding: 0 0 0 48px;
        border-bottom: none;
    }

    .header-new {
        text-align: left;
        padding: 20px 0 50px 30px;
        background-color: #fff;
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

    .elinput {
        width: 50px
    }

</style>
