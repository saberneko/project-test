<template>
	<header class="mui-bar mui-bar-nav" v-link="{path:'/main'}">
	<a class="mui-icon mui-icon-left-nav mui-pull-left"></a>
	<a class="mui-icon mui-icon-reply mui-pull-right"></a>
	<h1 class="mui-title">修改密码</h1>
	</header>
	<p style="margin-top:60px">重要提示：建议密码采用数字与字母组合，增加安全性，并且不低于6位</p>
	<form class="mui-input-group" style="margin-top:30px" >
		<div class="mui-input-row">
		<label>当前密码</label>
		<input type="text" placeholder="请正确填写旧密码">
		</div>
		<div class="mui-input-row" >
		<label>新密码</label>
		<input type="text" placeholder="请填写新密码">
		</div>
		<div class="mui-input-row" >
		<label>确认新密码</label>
		<input type="text" placeholder="请确认新密码">
		</div>
		<div class="mui-button-row">
			<button class="mui-btn mui-btn-primary" onclick="return false;">确认</button>&nbsp;&nbsp;
			<button class="mui-btn mui-btn-primary" onclick="return false;">取消</button>
		</div>
	</form>
</template>