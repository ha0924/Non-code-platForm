package com.noncodebacked.Service.impl;


import com.noncodebacked.Model.entity.User;
import com.noncodebacked.Model.vo.UserVO;
import com.noncodebacked.Service.InnerUserService;
import com.noncodebacked.Service.UserService;
import jakarta.annotation.Resource;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

/**
 * 内部服务实现类
 */

public class InnerUserServiceImpl implements InnerUserService {

    @Resource
    private UserService userService;

    @Override
    public List<User> listByIds(Collection<? extends Serializable> ids) {
        return userService.listByIds(ids);
    }

    @Override
    public User getById(Serializable id) {
        return userService.getById(id);
    }

    @Override
    public UserVO getUserVO(User user) {
        return userService.getUserVO(user);
    }
}
