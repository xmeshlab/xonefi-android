package com.onefi.XOneFiApp;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.*;
// import com.facebook.react.jstasks.HeadlessJsTaskConfig;
// import com.facebook.react.jstasks.HeadlessJsRetryPolicy;
// import com.facebook.react.jstasks.LinearCountingRetryPolicy;

import javax.annotation.Nullable;

public class MyTaskService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {

      LinearCountingRetryPolicy retryPolicy = new LinearCountingRetryPolicy(
        100000, // Max number of retry attempts
        10000 // Delay between each retry attempt
      );

      return new HeadlessJsTaskConfig(
          "bgtask",
          Arguments.fromBundle(extras),
          10000000, // timeout in milliseconds for the task
          true, // optional: defines whether or not the task is allowed in foreground. Default is false
          retryPolicy
        );
    }
    return null;
  }
}