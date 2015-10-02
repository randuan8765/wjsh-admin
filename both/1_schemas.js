SimpleSchema.messages({
  "uniqueError": "系统中已有这个[label]"
});

SimpleSchema.messages({
  "noUser": "系统中没有手机号为[value]的用户"
});

SimpleSchema.messages({
  "noArea": "系统中没有区域编号为[value]的地区"
});

Schemas = {};

Meteor.isClient && Template.registerHelper("Schemas", Schemas);

Schemas.Classes = new SimpleSchema({
  name: { //两个值，一个值一个form
    type: String,
    label: "分类",
    // autoform: {
    //   type: "select-radio-inline",
    //   options: function () {
    //     return [
    //       {label: "鞋靴", value: "鞋靴"},
    //       {label: "皮具", value: "皮具"}
    //     ];
    //   }
    // }
  },
  flaws: {
    type: Array,
    label: "瑕疵"
  },
  'flaws.$': {
    type: String,
  },
  effects: {
    type: Array,
    label: "洗后效果"
  },
  'effects.$': {
    type: String,
  },
  accessories: {
    type: Array,
    label: "配件"
  },
  'accessories.$': {
    type: String,
  },
});

Schemas.Factories = new SimpleSchema({ //autoform框架，修改field能直接变更一切schema todo：调格式，按照bootstrap；插入前和修改前加createAt；创建账号
  key: {
    type: String,
    label: "厂遍号"
    //index: 1,
    //unique: true
  },
  name: {
    type: String,
    label: "全称"
  },
  aliase: {
    type: String,
    label: "简称"
  },
  'address.city': {
    type: String,
    label: "城市",
    allowedValues: ["天津市"],
  },
  'address': {
    type: Object,
    label: "地址",
  },
  'address.district': {
    type: String,
    label: "行政区",
    allowedValues: ["南开区","静海县"]
  },
  'address.street': {
    type: String,
    label: "街道",
  },
  contacts: {
    type: Array,
    label: "联系人"
  },
  'contacts.$': {
    type: Object,
  },
  'contacts.$.name': {
    type: String,
    label: "姓名",
  },
  'contacts.$.phone': {
    type: String,
    label: "手机号"
  },
  'contacts.$.title': {
    type: String,
    label: "职位/称号",
    optional: true
  },
  'description': {
    type: String,
    label: "备注",
    autoform: {
       rows: 3
    },
    optional: true
  },
  businesses: {
    type: Array,
    label: "成本价目表",
    optional: true
  },
  'businesses.$': {
    type: Object,
  },
  'businesses.$.name': {
    type: String,
    label: "名称",
  },
  'businesses.$.price': {
    type: Number,
    decimal: true,
    autoform: {
       step: "0.01"
    },
    label: "成本价"
  },
  'businesses.$.class': {
    type: String,
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "鞋靴", value: "鞋靴"}, //看下怎么设置default
          {label: "皮具", value: "皮具"}
        ];
      }
    },
    label: "所属分类（来自于分类列表）"
  },
  'businesses.$.description': {
    type: String,
    label: "描述",
    autoform: {
       rows: 3
    },
    optional: true
  },
});

Schemas.Areas = new SimpleSchema({ //autoform框架，修改field能直接变更一切schema todo：调格式，按照bootstrap
  key: {
    type: String, //TJ-NK-01
    label: "区域编号",
	//custom: function () {
	//	if (Areas.findOne({key:this.value}) !== undefined)
	//	{
	//		return "uniqueError";
	//	}
    //}
    //index: 1,
    unique: true
  },
  name: {
    type: String,
    label: "名称"
  },
  'preManager': {
    type: Object,
    label: "DB经理"
  },
  'preManager.name': {
    type: String,
    label: "姓名",
  },
  'preManager.mobile': {
    type: String,
    label: "手机号",
  },
  'postManager': {
    type: Object,
    label: "业务经理"
  },
  'postManager.name': {
    type: String,
    label: "姓名",
  },
  'postManager.mobile': {
    type: String,
    label: "手机号",
  },
  'description': {
    type: String,
    label: "区域备注",
    autoform: {
       rows: 3
    },
    optional: true
  },
  businesses: {
    type: Array,
    label: "对外售价表",
    optional: true
  },
  'businesses.$': {
    type: Object,
  },
  'businesses.$.key': {
    type: String,
    label: "编号（<洗涤厂编号>_<洗涤厂业务编号>）", //后期变成前端自动选取某个洗涤厂，
                                                //然后多选从该洗涤厂想要继承下来的业务及
                                                //对应价格，并可调整个别继承下来的价格作
                                                //为卖给夫妻店的低价 ，但是表结构不变
  },
  'businesses.$.name': {
    type: String,
    label: "名称",
  },
  'businesses.$.price': {
    type: Number,
    decimal: true,
    autoform: {
       step: "0.01"
    },
    label: "给夫妻店底价"
  },
  'businesses.$.description': {
    type: String,
    label: "描述（客户可读）",
    autoform: {
       rows: 3
    },
    optional: true
  },
});

Schemas.Employees = new SimpleSchema({ //autoform框架，修改field能直接变更一切schema todo：调格式，按照bootstrap
  name: {
    type: String,
    label: "姓名"
  },
  mobile: {
    type: String,
    label: "手机号"
  },
  staffId: {
    type: String,
    label: "工号",
	unique: true
	//custom: function () {
	//	if (Employees.findOne({staffId:this.value}) !== undefined && this.formType == "insert")
	//	{
	//		return "uniqueError";
	//	}
    //}
  },
  type: {
    type: String,
    label: "职务",
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "BD经理", value: "pre"}, //看下怎么设置default
          {label: "业务经理", value: "post"}
        ];
      }
    }
  },
  registerFormIds: { //每append一条，要记录时间
    type: Array,
    label: "申请表编号",
	optional: true
  },
  'registerFormIds.$': {
    type: String,
	optional: true
  },
});

Schemas.Stores = new SimpleSchema({ //autoform框架，修改field能直接变更一切schema todo：调格式，按照bootstrap；插入前和修改前加createAt；创建账号
  name: {
    type: String,
    label: "全称"
  },
  aliase: {
    type: String,
    label: "简称"
  },
  creator: {
    type: String,
    label: "创建用户手机",
	custom: function () {
		if (Meteor.users.find({username:this.value}).fetch().length == 0)
		{
			return "noUser";
		}
    }
  },
  address: {
    type: Object,
    label: "地域信息",
  },
  'address.area': {//要在area里创建
    type: String,
    label: "所属区域编号",
	custom: function (){
		if(Areas.findOne({key:this.value}) == undefined){
			return "noArea";
		}
	}
  },
  'address.street': {
    type: String,
    label: "具体地址",
  },
  contacts: {
    type: Array,
    label: "门店联系人"
  },
  'contacts.$': {
    type: Object,
  },
  'contacts.$.name': {
    type: String,
    label: "姓名",
  },
  'contacts.$.phone': {
    type: String,
    label: "手机号"
  },
  'contacts.$.title': {
    type: String,
    label: "职位/称号",
    optional: true
  },
  'description': {
    type: String,
    label: "备注",
    autoform: {
       rows: 3
    },
    optional: true
  },
  'registerFormId': {
    type: String,
    label: "申请表编号",
    optional: true
  },
  classes: {//由夫妻店用自己的saas client操作
    type: Array,
    label: "门店内部业务分类",
    optional: true,
    minCount: 1,
    maxCount: 4
  },
  "classes.$": {
    type: String
  },
  businesses: {//由夫妻店用自己的saas client操作
    type: Array,
    label: "门店内部价目表",
    optional: true
  },
  'businesses.$': {
    type: Object,
  },
  'businesses.$.name': {
    type: String,
    label: "名称",
  },
  'businesses.$.price': {
    type: Number,
    decimal: true,
    autoform: {
       step: "0.01"
    },
    label: "门店对外定价"
  },
  'businesses.$.class': {
    type: String,
    label: "业务类别（来自于门店定义的class）"
  },
  'businesses.$.order': {
    type: Number,
    label: "顺序"
  },
  'businesses.$.description': {
    type: String,
    label: "描述",
    autoform: {
       rows: 3
    },
    optional: true
  },
});
