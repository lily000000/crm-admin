<template>
  <div id="customercont">
    <p class="customertite">{{addTitile}}</p>
    <!-- <input-wrap
      v-for="(item,index) in inputWrapList"
      :xindex="index"
      :key="index"
      @onChange="(value)=>inputChange(value,index)"
      @onAdd="onAdd"
      @onDelete="(value)=>onDelete(value,index)"
    /> -->
    <el-tabs type="border-card">
      <el-tab-pane label="家长信息">
        <parents-from></parents-from>
      </el-tab-pane>
      <el-tab-pane label="学生信息">
        <students-from></students-from>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import studentsFrom from "./components/studentsFrom.vue";
import parentsFrom from "./components/parentsFrom.vue";
import inputWrap from "components/inputWrap/index.vue";
export default {
  components: {
    studentsFrom,
    parentsFrom,
    inputWrap
  },
  data() {
    return {
      readonly: false,
      labelPosition: "right",
      addTitile: "新增客户",
      inputWrapList: [{}],
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区"
                },
                {
                  value: "haizhu",
                  label: "海珠区"
                }
              ]
            },
            {
              value: "dongguan",
              label: "东莞市",
              children: [
                {
                  value: "changan",
                  label: "长安镇"
                },
                {
                  value: "humen",
                  label: "虎门镇"
                }
              ]
            }
          ]
        },
        {
          value: "hunan",
          label: "湖南省",
          children: [
            {
              value: "changsha",
              label: "长沙市",
              children: [
                {
                  value: "yuelu",
                  label: "岳麓区"
                }
              ]
            }
          ]
        }
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        options: [],
        delivery: false,
        type: [],
        resource: 3,
        desc: "",
        role: "",
        occupation: "",
        gender: "",
        grade: "",
        city: [],
        character: "",
        chat: "",
        chatName: "",
        chatNote: "",
        parentsName: "",
        addChatName: "",
        parentsRole: "",
        economicRole: "",
        education: "",
        appeal: "",
        familyNum: ""
      },
      rules: {
        chatName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },

  mounted() {
    //1新增2编辑3查看
    console.log(this.$route.query.id);
    if (this.$route.query.id == 1) {
      this.readonly = false;
      this.addTitile = "新增客户";
    } else if (this.$route.query.id == 2) {
      this.readonly = false;
      this.addTitile = "编辑客户";
    } else {
      this.readonly = true;
      this.addTitile = "查看信息";
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    radioChange(e) {
      console.log(e);
    },
    // inputChange(value, index) {
    //   this.inputWrapList[index] = value;
    // },
    // onAdd() {
    //   this.inputWrapList = [...this.inputWrapList, {}];
    //   console.log(this.inputWrapList);
    // },
    // onDelete(value, index) {
    //   let newList = [...this.inputWrapList];
    //   newList.splice(index, 1);
    //   this.inputWrapList = newList;
    // }
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
