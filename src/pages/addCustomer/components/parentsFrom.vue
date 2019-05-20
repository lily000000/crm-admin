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
      <el-form-item label="加v时间" prop="enterTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.enterTime"
          style="width: 200px;"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="微信号" prop="wechatId">
        <el-input v-model="form.wechatId" style="width:200px" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="微信名" label-width="100px" prop="wechatName">
        <el-input v-model="form.wechatName" style="width:200px" placeholder="请输入微信名"></el-input>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="微信备注">
        <el-input v-model="form.wechatComments" style="width:200px" placeholder="请输入微信备注"></el-input>
      </el-form-item>
      <el-form-item label="渠道号" prop="channel">
        <el-cascader
          expand-trigger="hover"
          :options="listByCodeData_1[0] ? listByCodeData_1[0].dictDetailList:[]"
          :props="cityProps"
          v-model="form.channel"
          placeholder="请输入渠道号"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="所加微信号" label-width="110px">
        <!-- <el-input v-model="form.enterWechat" style="width:200px" placeholder="请输入所加微信号"></el-input> -->
        <el-select v-model="form.enterWechat" placeholder="请输入所加微信号" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[1] ? listByCodeData_1[1].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
          <!-- <el-option :label="item.name" :value="item.name"></el-option> -->
        </el-select>
      </el-form-item>
    </div>
    <div class="form-item">
      <el-form-item label="家长姓名">
        <el-input v-model="form.parentsName" style="width:200px" placeholder="请输入家长姓名"></el-input>
      </el-form-item>
      <el-form-item label="家庭角色">
        <el-select v-model="form.role" placeholder="请选择家庭角色" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[1] ? listByCodeData_1[1].dictDetailList:[])"
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
            v-for="(item,index) in (listByCodeData_1[2] ? listByCodeData_1[2].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经济能力">
        <el-select v-model="form.economy" placeholder="请选择经济能力" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[11] ? listByCodeData_1[11].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" label-width="100px">
        <el-select v-model="form.education" placeholder="请选择学历" style="width:200px">
          <el-option
            v-for="(item,index) in (listByCodeData_1[3] ? listByCodeData_1[3].dictDetailList:[])"
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
            v-for="(item,index) in (listByCodeData_1[4] ? listByCodeData_1[4].dictDetailList:[])"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="家庭编号">
      <el-radio-group v-model="familyIdNumber" @change="radioChange">
        <el-radio :label="item.value" v-for="item in isFamilyId" :key="item.id" >{{item.label}}</el-radio>
      </el-radio-group>
      <el-select
        placeholder="请选择家庭编号"
        v-model="form.familyId"
        style="width:200px;margin-left:35px;"
        v-if="familyShow"
        multiple
        filterable
        remote
        reserve-keyword
        :remote-method="remoteMethod"
        :loading="loading"
        @change="searchNumber"
      >
        <el-option
          v-for="(item,index) in options_2"
          :key="index"
          :label="item.familyId"
          :value="item.familyId"
        ></el-option>
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
    readonly: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      options_1: [],
      options_2:[],
      loading: false,
      listByCodeData_1: [],
      labelPosition: "right",
      delVisible: false,
      tagTitle: "打标签",
      tagCompilations: false,
      tagItem: [],
      familyIdNumber:"0",
      familyShow: false,
      isFamilyId: [
        { label: "生成家庭编号", value: "0" },
        { label: "绑定家庭编号", value: "1" }
      ],
      cityProps: {
        value: "id",
        label: "name",
        children: "areaList"
      },
      channelProps: {
        value: "id",
        label: "name",
        children: ""
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
        enterTime: "",
        address: [], //地址
        updateUser: "", //更新用户
        createUser: "", //创建用户int
        age: 0,
        id: null, //家庭编号
        isDeleted: false, //是否删除
        familyId: "0",
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
        channel: [] //int
        //channel:""
      },
      rules: {
        wechatId: [
          { required: true, message: "请输入微信名", trigger: "blur" },
          { min: 3, max: 5, message: "请输入微信名", trigger: "blur" }
        ],
        // enterTime: [
        //   { required: true, message: "请选择加V时间", trigger: "blur" },
        //   {  message: "请选择加V时间", trigger: "blur" }
        // ],
        wechatName: [
          { required: true, message: "请输入微信号", trigger: "blur" },
          { min: 3, max: 5, message: "请输入微信号", trigger: "blur" }
        ],
        channel: [
          { required: true, message: "请选择渠道号", trigger: "blur" },
          { min: 3, max: 5, message: "请选择渠道号", trigger: "blur" }
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
    searchNumber(){
      this.options_2=[];

    },
    radioChange(e) {
      if (e == 1) {
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
    },
    remoteMethod(query) {
      this.searchFamily('哈哈');
    },
    searchFamily(wechatId) {
      const params = { wechatId: wechatId };
      this.$API.getCustomeListReq(params).then(res => {
        // const { data, msg, status } = res;
        console.log('看看', res);
        this.options_2 = res;
      });
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

