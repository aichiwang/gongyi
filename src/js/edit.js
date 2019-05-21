Init();

function Init() {

	getUserInfo();

	$('.comfirmBtn').on('click', function() {
		var uname = $('#uname').val();
		var sex = $('[name=sex]:checked').val();
		var uage = $('#uage').val();
		var receiver = $('#receiver').val();
		var phone = $('#phone').val();
		var province = $('#province_selector').val();
		var city = $('#city_selector').val();
		var district = $('#district_selector').val();
		var detailArea = $('#detailArea').val();

		if(!uname) {
			globalMes('请输入姓名')
		} else if(!sex) {
			globalMes('请选择性別')
		} else if(!uage) {
			globalMes('请选择年齡')
		} else if(!receiver) {
			globalMes('请填写收件人')
		} else if(!phone) {
			globalMes('请填写手机号')
		} else if(!province) {
			globalMes('请选择省')
		} else if(!city) {
			globalMes('请选择市')
		} else if(!detailArea) {
			globalMes('请输入详细地址')
		} else {
			$.ajax({
				type: "get",
				dataType: 'jsonp',
				url: "http://cbg.mobilefoundation.org.cn/api/user/edit",
				data: {
					name: uname,
					sex: sex,
					age: uage,
					receiver_name: receiver,
					receiver_phone: phone,
					res_province: province,
					res_city: city,
					address: detailArea
				},
				async: true,
				success: function(data) {
					console.log(data)
					globalMes(data.msg)
					setTimeout(function() {
						//						location.href = 'center.html'
					}, 3000)
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

	function getUserInfo() {
		$.ajax({
			type: "get",
			dataType: 'jsonp',
			url: "http://cbg.mobilefoundation.org.cn/api/user/getuserinfo",
			data: {
				//				uid: 8
			},
			async: true,
			success: function(data) {
				console.log(data)
				$('#uname').val(data.data.userinfo.name);
				$('#uage').find('[value=' + data.data.userinfo.age + ']').attr('selected', 'selected');
				$('#receiver').val(data.data.userinfo.receiver_name);
				$('#phone').val(data.data.userinfo.receiver_phone);
				console.log( data.data.userinfo.res_province.slice(0, 2) )
				$('#province_selector [value=' + data.data.userinfo.res_province.slice(0, 2) + ']').attr('selected', 'selected')
				$('#city_selector [value=' + data.data.userinfo.res_city.slice(0, 2) + ']').attr('selected', 'selected')
//				$('#province_selector [value=' + data.data.userinfo.receiver_phone.slice(0, 2) + ']').attr('selected', 'selected')

				$('[value=' + data.data.userinfo.sex + ']').attr('checked', 'checked');
				$('#detailArea').val(data.data.userinfo.address);
			}
		});
	}

}