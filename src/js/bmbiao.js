

Init();

function Init() {

	$('.comfirmBtn').on('click', function() {
		var uname = $('#uname').val();
		var sex = $('[name="sex"]:checked').val();
		var uage = $('#uage').val();
		var receiver = $('#receiver').val();
		var phone = $('#phone').val();
		var province = $('#province_selector').val();
		var city = $('#city_selector').val();
		var district = $('#district_selector').val();
		var detailArea = $('#detailArea').val();
		if(!uname) {
			globalMes('请输入姓名')
		}else if(!sex){
			globalMes('请选择性别')
		}else if(!uage){
			globalMes('请选择年龄')
		}else if(!receiver){
			globalMes('请填写收件人')
		}else if(!phone){
			globalMes('请填写手机号')
		}else if(!province){
			globalMes('请选择省')
		}else if(!city){
			globalMes('请选择市')
		}else if(!detailArea){
			globalMes('请填写详细地址')
		}else{
			$.ajax({
					type: "get",
					dataType: 'jsonp',
					url: "http://cbg.mobilefoundation.org.cn/api/user/add",
					data: {
						name: uname,
						headimgurl: '',
						sex: sex,
						age: uage,
						receiver_name: receiver,
						receiver_phone: phone,
						res_province: province,
						res_city: city,
						address: detailArea,
					},
					async: true,
					success: function(data) {
						console.log(data)
						globalMes( data.msg)
						setTimeout(function(){
							location.href = 'entry.html'
						},3000)
					}
				});
		}
	})

	function globalMes(txt) {
		$('body').append('<div class="globalmes">' + txt + '</div>')
		setTimeout(function() {
			$('.globalmes').remove();
		}, 2000)
	}
}