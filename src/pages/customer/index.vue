<template>
  <div>
    <div class="container">
      <div class="handle-box search-wrap">
        <el-input placeholder="筛选关键词" class="handle-input mr10" v-model="search"></el-input>
        <el-button type="primary" icon="search" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button type="danger" @click="addcustomer">新增</el-button>
      </div>
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="batchTag()">批量打标签</el-button>
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click="batchPartner()"
        >批量更换教育伙伴</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed prop="date" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="chatName" label="微信号" width="120"></el-table-column>
        <el-table-column prop="chatRemark" label="微信备注" width="120"></el-table-column>
        <el-table-column prop="channl" label="渠道" width="120"></el-table-column>
        <el-table-column prop="childName" label="孩子姓名" width="100"></el-table-column>
        <el-table-column prop="grade" label="孩子年级" width="100"></el-table-column>
        <el-table-column prop="diqu" label="地区" width="100"></el-table-column>
        <el-table-column prop="appeals" label="加v诉求" width="120"></el-table-column>
        <el-table-column prop="requirement" label="学习需求" width="120"></el-table-column>
        <el-table-column prop="huyuan" label="会员" width="120"></el-table-column>
        <el-table-column prop="tuike" label="推课记录" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p v-for="item in scope.row.tuike" :key="item.id">
                <span>{{item}}</span>
              </p>
              <div slot="reference" class="name-wrapper">
                <!-- <el-tag size="medium">{{ scope.row.tuike }}</el-tag> -->
                <el-link
                  :underline="false"
                  type="primary"
                  @click="onPushClass(scope.row)"
                >{{ scope.row.tuike[0] }}</el-link>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="fuqu" label="服务状态" width="120"></el-table-column>
        <el-table-column prop="genjin" label="跟进计划" width="120"></el-table-column>
        <el-table-column prop="genjintime" label="最后跟进时间" width="120"></el-table-column>
        <el-table-column prop="xiugai" label="最后修改时间" width="120"></el-table-column>
        <el-table-column prop="huoban" label="教育伙伴" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onSee">查看信息</el-button>
            <el-button @click="onRedact" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="onTag">打标签</el-button>
            <el-button type="text" size="small" @click="onfollow">跟进记录</el-button>
            <el-button @click="onAddLesson(scope.row)" type="text" size="small">新增推课</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      </div>
    </div>
    <!-- 打标签提示框 -->
    <tag-toast
      :delVisible="delVisible"
      :tagTitle="tagTitle"
      :tagCompilations="tagCompilations"
      @onCancel="onCancel"
      @tagConfirm="tagConfirm"
    ></tag-toast>
    <el-dialog title="批量更换教育伙伴" :visible.sync="educatioToast" width="500px" left>
      <div class="del-dialog-cnt">
        <p class="toast-tilte">
          所有被选中的
          <span>88</span>位客户 将批量更换教育伙伴
        </p>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="教育伙伴">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="educatioToast = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <follow-toast
      :followUptoast="followUptoast"
      :form="form"
      @onCancel="onCancel"
      @tagConfirm="tagConfirm"
    ></follow-toast>
    <add-lesson :lessonToast="lessonToast" :form="form" :lessonstate="lessonstate"></add-lesson>
  </div>
</template>
<script>
import tagToast from "components/tagToast/index.vue";
import followToast from "./components/followUp.vue";
import addLesson from "./components/addLesson.vue";
export default {
  components: {
    tagToast,
    followToast,
    addLesson
  },
  data() {
    return {
      delVisible: false,
      tagCompilations: true,
      educatioToast: false,
      loading: false,
      tableData: [],
      pageNo: 1,
      pageSize: 20,
      search: "",
      total: 0,
      radio: 3,
      tagItem: [],
      tagTitle: "打标签",
      followUptoast: false,
      lessonToast: false,
      reverse: true,
      lessonstate: false,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ],
      options: [
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        }
      ],
      value5: [],
      value: "", //教育伙伴
      form: {
        name: "",
        region: "",
        options: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        cont: "",
        gender: ""
      }
    };
  },
  mounted() {
    this.getCustomerTables();
    this.$API.getCustomer().then(res => {
      console.log(res);
    });
  },
  methods: {
    //客户管理表格数据请求
    getCustomerTables() {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        search: this.search
      };
      this.loading = true;
      this.$API.getCustomerTables(params).then(res => {
        const { data, message, success } = res;
        if (success) {
          this.tableData = data.data;
          this.total = data.total;
          this.loading = false;
        }
      });
    },
    //重置
    onReset() {
      this.search = "";
      this.pageNo = 1;
      this.getCustomerTables();
    },
    //搜索
    onSearch() {
      this.pageNo = 1;
      this.getCustomerTables();
    },
    //新增客户
    addcustomer() {
      this.$router.push({ path: "/addcustomer", query: { type: 1 } });
    },
    //编辑
    onRedact() {
      this.$router.push({ path: "/addcustomer", query: { type: 2 } });
    },
    //查看客户
    onSee() {
      this.$router.push({ path: "/addcustomer", query: { type: 3 } });
    },
    onCancel() {
      this.delVisible = false;
      this.followUptoast = false;
    },
    onfollow() {
      this.followUptoast = true;
    },
    //打标签
    onTag() {
      this.tagTitle = "打标签";
      this.delVisible = true;

      // this.$API.getTagData({}).then(res => {
      //   console.log(res);
      //   const { data, message, success } = res;
      //   if (success) {
      //     this.tagItem = data.tagItem;
      //   }
      // });
    },

    batchTag() {
      this.tagTitle = "批量打标签";
      this.delVisible = true;
    },
    batchPartner() {
      this.educatioToast = true;
    },
    onTageChose(value5) {
      this.tagItem = value5;
      console.log(value5);
    },
    tagConfirm() {
      this.delVisible = false;
      this.followUptoast = false;
    },
    delBtn(e) {
      console.log(e);
      this.tagItem.splice(e, 1);
    },
    onSubmit() {
      console.log("submit!");
    },
    //新增推课
    onAddLesson(row) {
      console.log(row);
      this.lessonstate = true;
      this.lessonToast = true;
    },
    //查看推课
    onPushClass(cont) {
      console.log("查看推课", cont);
      this.lessonstate = false;
      console.log('eeeee',this.lessonstate)
      this.lessonToast = true;
    },
    //请求第几页
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.pageNo = currentPage;
      this.getCustomerTables();
    },
    //每页展示多少条
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.pageNo = 1;
      this.pageSize = pageSize;
      this.getCustomerTables();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>


