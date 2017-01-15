<template>
	<header class="mui-bar mui-bar-nav" v-link="{path:'/main'}">
	<a class="mui-icon mui-icon-left-nav mui-pull-left"></a>
	<a class="mui-icon mui-icon-reply mui-pull-right"></a>
	<h1 class="mui-title">成绩查询</h1>
	</header>
	<form class="mui-input-group" style="margin-top:70px" >
		<div class="mui-input-row">
		<label>专业名称{{selecttd}}</label>
	  	<select v-model="selected">
	  	<option>电子专业</option>
	  	<option>通信专业</option>
	  	<option>网络专业</option>
	  	<option>测仪专业</option>
    	</select>
		</div>
		<div class="mui-input-row" >
			<label>成绩总分</label>
		</div>
		<div class="mui-input-row" >
			<label>综测总分</label>
		</div>
		<div class="mui-input-row" >
			<label>专业排名</label>
		</div>
		<div class="mui-input-row" style="margin: 10px 5px;">
		<label>备注</label>
		<textarea rows="5" placeholder="对成绩有何疑问"></textarea>
		</div>
	</form>
</template>   