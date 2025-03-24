package com.zyh.graduation.controller;

import com.zyh.graduation.service.SeatService;
import com.zyh.graduation.config.util.Result;
import com.zyh.graduation.entity.Order;
import com.zyh.graduation.entity.User;
import com.zyh.graduation.entity.Vo.OrderItem;
import com.zyh.graduation.service.OrderService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private SeatService seatService;

    @PostMapping("/addOrder")
    public Result addOrder(@RequestParam("itemId") Integer itemId,
                           @RequestParam("itemType") String itemType,
                           @RequestParam("relateId") Integer relateId,
                           @RequestParam("orderId") String orderId,
                           @RequestParam("price") Double price,
                           @RequestParam("seat") String seat,
                           @RequestParam("snackSeat") String  snackSeat){
        Subject subject = SecurityUtils.getSubject();
        if(!subject.isAuthenticated())
            return new Result(Result.NOAUTHC,"未登录");
        User user = (User)subject.getPrincipal();
        Order order = new Order();
        order.setItemId(itemId);
        order.setItemType(itemType);
        order.setRelateId(relateId);
        order.setOrderId(orderId);
        order.setPrice(new BigDecimal(price));
        order.setOrderUid(user.getId());
        order.setCreateTime(new Date());
        order.setSnackSeat(snackSeat);
        OrderItem orderItem = orderService.addOrder(order,seat);
        return new Result(orderItem);
    }

    @GetMapping("/getMovieOrder")
    public Result getMovieOrder(){
        Subject subject = SecurityUtils.getSubject();
        if(!subject.isAuthenticated())
            return new Result(Result.NOAUTHC,"未登录");
        User user = (User)subject.getPrincipal();
        List<OrderItem> orderList = orderService.getMovieOrderByUser(user.getId());
        return new Result(orderList);
    }
    @GetMapping("/getMovieOrderByCinema")
    @ResponseBody
    public Result getMovieOrderByCinema(@RequestParam Integer cinemaId){
        Subject subject = SecurityUtils.getSubject();
        if(!subject.isAuthenticated())
            return new Result(Result.NOAUTHC,"未登录");
        User user = (User)subject.getPrincipal();
        List<OrderItem> orderList = orderService.getMovieOrderByCinema(user.getId(),cinemaId);
        return new Result(orderList);
    }
    @GetMapping("/getSnackOrderById")
    public Result getSnackOrderById(@RequestParam String orderId){
        Order order = orderService.getOrderById(orderId);
        return new Result(order);
    }
    @GetMapping("/getSnackOrder")
    public Result getSnackOrder(){
        Subject subject = SecurityUtils.getSubject();
        if(!subject.isAuthenticated())
            return new Result(Result.NOAUTHC,"未登录");
        User user = (User)subject.getPrincipal();
        List<OrderItem> orderList = orderService.getSnackOrderByUser(user.getId());
        return new Result(orderList);
    }
}
