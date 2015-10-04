SimpleSchema.messages({
  "uniqueError": "系统中已有这个[label]"
});

SimpleSchema.messages({
  "noUser": "系统中没有手机号为[value]的用户"
});

SimpleSchema.messages({
  "noArea": "系统中没有区域编号为[value]的地区"
});

SimpleSchema.messages({
  "noFactory": "系统中没有厂编号为[value]的工厂"
});

SimpleSchema.messages({
  "noFactoryBusiness": "该厂没有编号为[value]的业务"
});
Schemas = {};

var temp;

Meteor.isClient && Template.registerHelper("Schemas", Schemas);

Schemas.Employees = new SimpleSchema({
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
    },
    index: 1
  },
  registerFormIds: { //每append一条，要记录时间
    type: Array,
    label: "申请表编号",
	  optional: true
  },
  'registerFormIds.$': {
    type: String,
  },
});

Schemas.Factories = new SimpleSchema({
  key: {
    type: String,
    label: "厂编号",
    unique: true
  },
  name: {
    type: String,
    label: "全称"
  },
  aliase: {
    type: String,
    label: "简称",
    optional: true
  },
  'address': {
    type: Object,
    label: "地址",
  },
  // 'address.city': {
  //   type: String,
  //   label: "城市",
  //   allowedValues: ["天津市"],
  // },
  // 'address.street': {
  //   type: String,
  //   label: "详细地址",
  // },
  'address.fullAddress': {
    type: String,
    label: "详细地址",
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
});

Schemas.FactoryBusinesses = new SimpleSchema({
  name: {
    type: String,
    label: "名称",
  },
  price: {
    type: Number,
    decimal: true,
    autoform: {
       step: "0.01"
    },
    label: "成本价"
  },
  description: {
    type: String,
    label: "描述",
    autoform: {
       rows: 3
    },
    optional: true
  },
  factoryId: {
    type: String,
    label: "工厂ID",
    index: 1
  }
});

Schemas.Classes = new SimpleSchema({
  name: {
    type: String,
    label: "分类",
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

Schemas.Areas = new SimpleSchema({
  key: {
    type: String, //12010000000
    label: "区域编号",
    unique: true
  },
  name: {
    type: String,
    label: "名称"
  },
  preManagerId: {
    type: String,
    label: "DB经理",
    autoform: {
      type: "select",
      options: function () {
        var options = [];
        Employees.find({type: 'pre'}).fetch().forEach(function (element){
          options.push({
            label: element.name+'('+element.staffId+')', value: element._id
          })
        })
        return options
      },
    },
  },
  postManagerId: {
    type: String,
    label: "业务经理",
    autoform: {
      type: "select",
      options: function () {
        var options = [];
        Employees.find({type: 'post'}).fetch().forEach(function (element){
          options.push({
            label: element.name+'('+element.staffId+')', value: element._id
          })
        })
        return options
      },
    },
  },
  'description': {
    type: String,
    label: "区域备注",
    autoform: {
       rows: 3
    },
    optional: true
  },
});

Schemas.AreaBusinesses = new SimpleSchema({
  name: {
    type: String,
    label: "名称",
  },
  classId: {
    type: String,
    autoform: {
      type: "select-radio-inline",
      options: function () {
        var options = [];
        Classes.find().fetch().forEach(function (element){
          options.push({
            label: element.name, value: element._id
          })
        })
        return options
      }
    },
    label: "所属分类"
  },
  factoryId: {
    type: String,
    label: "送洗加工厂",
    autoform: {
      type: "select",
      options: function () {
        var options = [];
        Factories.find().fetch().forEach(function (element){
          options.push({
            label: element.name+'('+element.key+')', value: element._id
          })
        })
        return options
      }
    },
  },
  factoryBusinessId: {
    type: String,
    label: "对应加工厂业务",
    autoform: {
      type: "select",
      options: function () {
        var options = [];
        if(Session.get("selectedFactorySelector")) {
          Meteor.subscribe("factoryBusinesses", Session.get("selectedFactorySelector"));
          FactoryBusinesses.find().fetch().forEach(function (element){
            options.push({
              label: element.name, value: element._id
            })
          })
        }
        return options
      }
    }
  },
  price: {
    type: Number,
    decimal: true,
    autoform: {
       step: "0.01"
    },
    label: "区域定价"
  },
  description: {
    type: String,
    label: "描述（对外）",
    autoform: {
       rows: 3
    },
    optional: true
  },
  areaId: {
    type: String,
    label: "区域ID",
    index: 1
  }
});


Schemas.Stores = new SimpleSchema({
  key: {
    type: String,
    label: "门店编号",
    unique: true
  },
  name: {
    type: String,
    label: "全称"
  },
  aliase: {
    type: String,
    label: "简称",
    optional: true
  },
  creator: {
    type: String,
    label: "关联手机账号",
  	custom: function () {
      if (Meteor.users.find({username:this.value}).fetch().length == 0)
  		{
  			return "noUser";
  		}
    },
    // unique: false
  },
  area : {
    type: String,
    label: "所属区域",
    autoform: {
      type: "select",
      options: function () {
        var options = [];
        Areas.find().fetch().forEach(function (element){
          options.push({
            label: element.name+'('+element.key+')', value: element._id
          })
        })
        return options
      }
    },
  },
  'address': {
    type: Object,
    label: "地址",
  },
  'address.fullAddress': {
    type: String,
    label: "详细地址",
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
});

Schemas.StoreClasses = new SimpleSchema({
  name: {
    type: String,
    label: "分类名称",
  },
  storeId: {
    type: String,
    index: 1
  },

});
