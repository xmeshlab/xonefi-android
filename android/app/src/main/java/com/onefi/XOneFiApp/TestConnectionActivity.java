package com.onefi.XOneFiApp;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.onefi.XOneFiApp.service.wifi.WifiService;

public class TestConnectionActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_connection);
        Button btn = findViewById(R.id.connect_btn);
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION )!= PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String []{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }
        btn.setOnClickListener(e -> {
//            String[] permissions = {Manifest.permission.ACCESS_FINE_LOCATION};
//            ActivityCompat.requestPermissions(this, permissions, 666);
//            PermissionX.init(TestConnectionActivity.this)
//                    .permissions(Manifest.permission.ACCESS_FINE_LOCATION)
//                    .request((boolean allGranted, @NonNull List<String> grantedList, @NonNull List<String> deniedList) -> {
//                        if (allGranted) {
//
//                        }
//                    });


            Intent startIntent = new Intent(TestConnectionActivity.this, WifiService.class);
            startService(startIntent);

        });

        Button mainBtn = findViewById(R.id.go_to_main);
        mainBtn.setOnClickListener(e -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });
    }
}