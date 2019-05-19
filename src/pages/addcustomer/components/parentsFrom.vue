<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    :rules="rules"
    :label-position="labelPosition"
    :disabled="readonly"
  >
    <div class="form-item">
      <el-form-item label="加v时间" prop="date1">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.enterTime"
          style="width: 200px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="微信号" prop="chat">
        <el-input v-model="form.wechatId" style="width:200px" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="微信名" label-width="100px" prop="chatName">
        <el-input v-model="form.wechatName" style="width:200px" placeholder="请输入微信名"></el-input>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="微信备注">
        <el-input v-model="form.wechatComments" style="width:200px" placeholder="请输入微信备注"></el-input>
      </el-form-item>
      <el-form-item label="渠道号" prop="selectedOptions">
        <el-cascader
          expand-trigger="hover"
          :options="optionst"
          v-model="channel"
          placeholder="请输入渠道号"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="所加微信号" label-width="100px">
        <el-input v-model="form.enterWechat" style="width:200px" placeholder="请输入所加微信号"></el-input>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="家长姓名">
        <el-input v-model="form.parentsName" style="width:200px" placeholder="请输入家长姓名"></el-input>
      </el-form-item>
      <el-form-item label="家庭角色">
        <el-select v-model="form.role" placeholder="请选择家庭角色" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[0] ? listByCodeData_1[0].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
          <!-- <el-option :label="item.name" :value="item.name"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="家长年龄" label-width="100px">
        <el-input v-model="form.age" style="width:200px" placeholder="请输入家长年龄"></el-input>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="职业">
        <el-select v-model="form.occupation" placeholder="请选择职业" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[1] ? listByCodeData_1[1].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经济能力">
        <el-select v-model="form.economy" placeholder="请选择经济能力" style="width:200px">
          <el-option label="爸爸" value="爸爸"></el-option>
          <el-option label="妈妈" value="妈妈"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" label-width="100px">
        <el-select v-model="form.education" placeholder="请选择学历" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[1] ? listByCodeData_1[1].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="城市级联">
        <el-cascader
          :options="options_1"
          v-model="form.address"
          :props="cityProps"
          style="width:200px"
          placeholder="请选择地区"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="家长需求">
        <el-select v-model="form.demand" placeholder="请选择家长需求" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[2] ? listByCodeData_1[2].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="家庭编号">
      <el-radio-group v-model="form.familyId" @change="radioChange">
        <el-radio :label="3">生成家庭编号</el-radio>
        <el-radio :label="6">绑定家庭编号</el-radio>
      </el-radio-group>
      <el-select
        placeholder="请选择家庭编号"
        v-model="form.id"
        style="width:200px;margin-left:35px;"
        v-if="familyShow"
        allow-create
        default-first-option  
        filterable
      >
        <el-option label="0" value="0"></el-option>
        <el-option label="1" value="1"></el-option>
      </el-select>
      <p class="warn">(若该家庭成员中，已有家长平台会员则无需生成，只需进行绑定家庭编号)</p>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.comments" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="标签">
      <div>
        <el-button
          type="danger"
          plain
          v-for="(item,index) in tagItem"
          :key="index"
          class="btn-item"
          @click="parentDelBtn(index)"
        >
          {{item}}
          <i class="el-icon-error el-icon--right"></i>
        </el-button>
        <el-button type="primary" plain @click="onTag">
          打标签
          <i class="el-icon-plus el-icon--right"></i>
        </el-button>
      </div>
    </el-form-item>
    <tag-toast
      :delVisible="delVisible"
      :tagTitle="tagTitle"
      @onCancel="onCancel"
      @tagConfirm="tagConfirm"
      :tagCompilations="tagCompilations"
    ></tag-toast>
  </el-form>
</template>
<script>
import tagToast from "components/tagToast/index.vue";
import { constants } from "crypto";
export default {
  components: {
    tagToast
  },
  props: {
    options: {
      type: Array
    },
    listByCodeData: {
      type: Array
    },
    readonly:{
      type:Boolean
    },
    title:{
      type:String
    },
  },
  data() {
    return {
      options_1: [],
      listByCodeData_1: [],
      labelPosition: "right",
      delVisible: false,
      tagTitle: "打标签",
      tagCompilations: false,
      tagItem: [],
      familyShow: false,
      address: [],
      channel: [],
      cityProps: {
        value: "id",
        label: "name",
        children: "areaList"
      },
      optionst: [
        {
          value: "guangdong",
          label: "小红书"
        },
        {
          value: "guangdong",
          label: "微信"
        },
        {
          value: "hunan",
          label: "淘宝",
          children: [
            {
              value: "11111",
              label: "111111"
            }
          ]
        }
      ],
      form: {
        enterTime:"",
        address: [], //地址
        updateUser: "", //更新用户
        createUser: "", //创建用户int
        age: 0,
        id: null, //家庭编号
        isDeleted: false, //是否删除
        familyId: "",
        comments: "",
        role: "",
        occupation: "",
        grade: "",
        wechatId: "",
        wechatComments: "",
        wechatName: "",
        enterWechat: "",
        role: "",
        economy: "", //经济能力
        education: "",
        demand: "",
        channel: "" //int
        //channel:""
      },
      rules: {
        wechatId: [
          { required: true, message: "请输入微信名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        date1: [
          { required: true, message: "请选择加V时间", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        chat: [
          { required: true, message: "请输入微信号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        selectedOptions: [
          { required: true, message: "请选择渠道号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    form: {
      handler: function(newVal, oldVal) {
        this.$emit("onChange", newVal);
      },
      deep: true
    },
    options: {
      handler: function(newVal, oldVal) {
        this.options_1 = [...newVal];
      },
      deep: true
    },
    address: {
      handler: function(newVal, oldVal) {
        console.log(newVal);
      },
      deep: true
    },
    listByCodeData: {
      handler: function(newVal, oldVal) {
        this.listByCodeData_1 = [...newVal];
        console.log(this.listByCodeData_1, "code");
      },
      deep: true
    }
  },
  mounted() {
    this.$emit("onChange", this.form);
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    radioChange(e) {
      if (e == 6) {
        this.familyShow = true;
      } else {
        this.familyShow = false;
      }
    },
    onTag() {
      this.delVisible = true;
    },
    onCancel() {
      this.delVisible = false;
    },
    tagConfirm(tagArry) {
      this.delVisible = false;
      this.tagItem = this.tagItem.concat(tagArry);
    },
    parentDelBtn(index) {
      this.tagItem.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.form-item {
  display: flex;
  justify-content: flex-start;
}
.el-form-item__content {
  width: 200px;
}
.el-input--small .el-input__inner {
  width: 200px !important;
}
.warn {
  color: #f56c6c;
}
.customertite {
  color: #606266;
  margin-bottom: 10px;
}
.serial {
  margin-left: 30px;
}
</style>

