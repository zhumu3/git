(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
var app=angular.module('myApp',[]);
app.controller('myCtrl',['$scope','$location',function($scope,$location){
    $scope.tasks=JSON.parse(localStorage.getItem('data'))||[];
    console.log($scope.tasks);
    $scope.newTask='';
    // 添加任务
    $scope.add=function(){
        if($scope.newTask=='')return;
        $scope.tasks.push({name:$scope.newTask,completed:false});
        $scope.newTask='';
    }
    // 编辑任务
    $scope.edit=function(index){
        $scope.tasks.forEach(function(value){value.editing=false;})
        $scope.tasks[index].editing=true;

    }
    // 确认任务
    $scope.confirm=function(event,index){
        if(event.code=='Enter'){
        $scope.tasks[index].editing=false;
        }
    }
    // 删除任务
    $scope.remove=function(index){
        $scope.tasks.splice(index,1);
    }
    //实时显示剩余任务
    $scope.left=function(){
        var count=0;
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].completed==false)
            {
                count++;
            }
        }
        return count;
    }
    
    //清除已经完成的任务
    $scope.clearCom=function(){
        $scope.tasks=$scope.tasks.filter(function(item){
            return item.completed==false
        })
        // for(var i=$scope.tasks.length-1;i>=0;i--)
        // {
        //     if($scope.tasks[i].completed==true){
        //     $scope.tasks.splice(i,1);
        //     }
        // }
    }
    //给每个任务定义item事件，判断如果全选了，那么让all也全选
    $scope.items=function(){
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].completed==false){
                $scope.all=false;
                return;
            }
            $scope.all=true;
        }
    }
    //all按钮控制任务全选与否
    $scope.toggleAll=function(){
        $scope.tasks.forEach(function(item){
             item.completed=$scope.all;
        })
    }
    //开始过滤器生涯
    $scope.all=function(){
        $scope.isCom=undefined;
    }
    $scope.active=function(){
        $scope.isCom=false;
    }
    $scope.com=function(){
        $scope.isCom=true;
    }
    $scope.location=$location;
    $scope.$watch('location.url()',function(){
        switch($location.url()){
            case '/active':{
        $scope.isCom=false;
        break;
            }
            case '/completed':{
        $scope.isCom=true;
        break;
            }
            case '/' :{
        $scope.isCom=undefined;
        break;
            }
        }
    })

    //监听看数据模型tasks的改变的处理任务
    $scope.$watch('tasks',function(){
        // console.log(1111);
        localStorage.setItem('data',JSON.stringify($scope.tasks));
    },true)


}])

})(window);
