package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Para admitir redes con http
         WebView webView = getBridge().getWebView();
         webView.getSettings().setMixedContentMode(
            WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
         );

        // Cambiar color del status bar
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark));
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            enableImmersiveMode();
        }
    }

    private void enableImmersiveMode() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            | View.SYSTEM_UI_FLAG_FULLSCREEN        // Oculta el status bar
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION   // Oculta la barra de navegación
        );
    }
}
