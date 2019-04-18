package com.itepem.vibe.service;

import java.io.File;

public class FileService {

    public static void main(String[] args) {
        getFiles("D:\\zz_perso\\vibe-files\\structure_name\\wtr10-2b_f");
    }


    public static void getFiles(final String path) {
        File folder = new File(path);
        File[] listOfFiles = folder.listFiles();

        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                System.out.println("File " + listOfFiles[i].getName());
            } else if (listOfFiles[i].isDirectory()) {
                System.out.println("Directory " + listOfFiles[i].getName());
            }
        }
    }
}
