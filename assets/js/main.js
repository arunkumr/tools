var $inputCSS=$("#input");
var $outputCSS=$("#output");
var $process=$("#Process");
var pxl=$("#pxl").val();

 //Regex Functions
 
    var readRegEx = function (str, re) {
        var resp = str.match(re);
        null !== resp && resp.shift();
        return resp;
    };

    var parseMQs = function (str) {
        return readRegEx(str, /(@media.(?!print)[^{]+\{[\s\S]+?}\s*})/g);
    };
    
    
    
    
    $process.click(function(){
     var mediaQueries = parseMQs($inputCSS.val());
     
     var jsMQ = $(mediaQueries).map(function () {
        var minWidth = readRegEx(this, /\(min-width:(.*?)px\)/);
        minWidth = null !== minWidth ? parseInt(minWidth) : 0;
        var maxWidth = readRegEx(this, /\(max-width:(.*?)px\)/);
        var css = readRegEx(this, /@media[^{]+\{([\s\S]+?})\s*}/);
        return { min: minWidth, max: maxWidth, css: css };
    });

    
        var $currentCSS = $(jsMQ).map(function () {
            if (null !== this.max) {
                if (pxl > this.min && pxl < this.max) {
                    return this.css;
                }
            } else {
                if (pxl > this.min) {
                    return this.css;
                }
            }
        }).get().join(" ");
        
    
     
     $outputCSS.val($currentCSS);
     
    });
