export function StopCCPDirective(): any {
  return {
    link:function(scope,element){
      element.on('cut copy paste', function (event) {
        event.preventDefault();
      });
    }
  };
};
