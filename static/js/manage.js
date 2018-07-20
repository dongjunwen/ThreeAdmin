//公用url地址
//本地
var fk_url = "http://127.0.0.1:9003/api";
//测试
//var fk_url = "http://10.103.21.26:2120/api";
//生产
//var fk_url = "http://10.103.21.33/fengkong/api";
//动态加载下拉框--修改吗，新增用
function getSelect(x, y) {

	var sel = document.getElementById(x);

	$.ajax({
		url: fk_url + "/sysDict/findDictByType?dictType=" + y,
		type: "get",
		dataType: "json", //数据格式 
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
		contentType: "application/json; charset=utf-8",
		async: false,
		success: function(res) {
			var _data = res.data;
			for(var i = 0; i < _data.length; i++) {
				//赋值 key，value
				sel.options[i] = new Option(_data[i].dictName, _data[i].dictCode);
			}
		}
	});
}

//动态加载下拉框--查询用--默认全部
function getAll(x, y) {

	var sel = document.getElementById(x);

	$.ajax({
		url: fk_url + "/riskCommon/findDictByType?dictType=" + y,
		type: "get",
		dataType: "json", //数据格式 
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
		contentType: "application/json; charset=utf-8",
		async: false,
		success: function(res) {
			var _data = res.data;
			str = "<option value='' selected>全部</option>"
			for(var i = 0; i < _data.length; i++) {
				//赋值 key，value
				sel.options[i] = new Option(_data[i].dictName, _data[i].dictCode);
				$("#" + x).append(str);
			}
		}
	});
}

//动态加载下拉框--查询用--默认某一项
function getDefault(x, y,defaultValue) {

	var sel = document.getElementById(x);

	$.ajax({
		url: fk_url + "/riskCommon/findDictByType?dictType=" + y,
		type: "get",
		dataType: "json", //数据格式 
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
		contentType: "application/json; charset=utf-8",
		async: false,
		success: function(res) {
			var _data = res.data;
			str = "<option value=''>全部</option>"
			for(var i = 0; i < _data.length; i++) {
				//赋值 key，value
				sel.options[i] = new Option(_data[i].dictName, _data[i].dictCode);
				if(_data[i].dictCode == defaultValue){
					sel.options[i].selected = true;
				}
				$("#" + x).append(str);
			}
		}
	});
}


/**
 * ajax封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，
 * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 * 注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
 * type 请求方式("POST" 或 "GET")， 默认为 "GET"
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
function post(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		type: "post",
		async: false,
		data: JSON.stringify(data),
		url: fk_url + url,
		dataType: "json",
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: "application/json",
		success: function(d) {
			if(d.retCode == "510") {
				top.location.href = '../../login.html';
				// 获得frame索引
				var index = layer.getFrameIndex(window.name);
				//关闭当前frame
				layer.close(index);
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};


function postFile(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		type: "post",
		async: false,
		data: data,
		dataType:"json",
		url: fk_url + url,
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: false,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
		success: function(d) {
			if(d.retCode == "510") {
				top.location.href = '../../login.html';
				// 获得frame索引
				var index = layer.getFrameIndex(window.name);
				//关闭当前frame
				layer.close(index);
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};

function get(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		url: fk_url + url,
		type: "get",
		async: false,
		data: data,
		dataType: "json",
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: "application/json",
		success: function(d) {
			if(d.retCode == "510") {
				top.location.href = './login.html';
				// 获得frame索引
				var index = layer.getFrameIndex(window.name);
				//关闭当前frame
				layer.close(index);
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};

function getAsync(url, data, successfn, errorfn) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	$.ajax({
		url: fk_url + url,
		type: "get",
		async: true,
		data: data,
		dataType: "json",
		xhrFields: {
            withCredentials: true//跨域
        },
        crossDomain: true,
        contentType: "application/json",
		success: function(d) {
			if(d.retCode == "510") {
				top.location.href = './login.html';
				// 获得frame索引
				var index = layer.getFrameIndex(window.name);
				//关闭当前frame
				layer.close(index);
			} else {
				successfn(d);
			}
		},
		error: function(e) {
			errorfn(e);
		}
	});
};

//分页
function toPage(total, currentPageAllAppoint, data) {
				
				layui.use(['form', 'laypage', 'layedit', 'layer', 'laydate'], function() {
					var form = layui.form,
						layer = layui.layer,
						layedit = layui.layedit,
						laydate = layui.laydate,
						laypage = layui.laypage;

					laypage.render({
						elem: 'paged',
						count: total, //得到总页数，在layui2.X中使用count替代了，并且不是使用"总页数"，而是"总记录条数"
						curr: currentPageAllAppoint,
						jump: function(obj, first) {

							currentPageAllAppoint = obj.curr;

							if(!first) {
								data;
							}
						}
					});

				});
				

			};
			
