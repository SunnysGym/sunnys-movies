!include "MUI2.nsh"

; Theming disabled until assets exist
;!define MUI_HEADERIMAGE
;!define MUI_HEADERIMAGE_BITMAP "build\\installerHeader.bmp"
;!define MUI_WELCOMEFINISHPAGE_BITMAP "build\\installerSidebar.bmp"
;!define MUI_UNWELCOMEFINISHPAGE_BITMAP "build\\uninstallerSidebar.bmp"

BrandingText "sunny's movie's"
!define MUI_ABORTWARNING

; Icons are managed by electron-builder config
;!define MUI_ICON "build\\icon.ico"
;!define MUI_UNICON "build\\icon.ico"

!define MUI_FINISHPAGE_TEXT "You're all set! Enjoy sunny's movie's."
!define MUI_FINISHPAGE_LINK "View project on GitHub"
!define MUI_FINISHPAGE_LINK_LOCATION "https://github.com/your/repo"

; No page/language macros here; electron-builder injects them.
