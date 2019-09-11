window.onload = function() {
  function showMailingPopUp() {
    window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
      L.start({
        baseUrl: "mc.us4.list-manage.com",
        uuid: "50cee86becc42f2aba98af2e8",
        lid: "3d7d52cfc4",
        uniqueMethods: true
      });
    });
    document.cookie =
      "MCPopupClosed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie =
      "MCPopupSubscribed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }
  document.getElementById("popup1").onclick = function() {
    showMailingPopUp();
  };
  document.getElementById("popup2").onclick = function() {
    showMailingPopUp();
  };
};
