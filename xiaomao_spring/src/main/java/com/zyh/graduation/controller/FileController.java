package com.zyh.graduation.controller;

import com.zyh.graduation.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.Response;
import java.io.File;
import java.io.UnsupportedEncodingException;

@RestController
public class FileController {
    @Autowired
    private FileService fileService;
    @GetMapping("/upFile/{fileName}")
    public Resource upfile(@PathVariable String fileName){
        return fileService.loadFileAsResource(fileName);
    }
}
