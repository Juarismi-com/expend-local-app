package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import android.view.View;

public class MainActivity extends BridgeActivity {
   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      
      // Activa el modo inmersivo
      getWindow().getDecorView().setSystemUiVisibility(
         View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
         | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
         | View.SYSTEM_UI_FLAG_FULLSCREEN
      );
   }
}
