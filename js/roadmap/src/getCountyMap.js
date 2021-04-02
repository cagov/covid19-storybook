export const getCountyMap = () => {
  // County map from tableau disabled.
  // var divElement = document.getElementById('viz1598633253507');
  // var vizElement = divElement.getElementsByTagName('object')[0];
  // if ( divElement.offsetWidth > 921 ) { vizElement.style.width='920px';vizElement.style.height='547px';}
  // else if ( (divElement.offsetWidth > 910) && (divElement.offsetWidth < 920)) { vizElement.style.width='900px';vizElement.style.height='547px';}
  // else if ( (divElement.offsetWidth > 700) && (divElement.offsetWidth < 899) ) { vizElement.style.width='700px';vizElement.style.height='547px';}
  // else { vizElement.style.width='100%';vizElement.style.height='627px';}
  // var scriptElement = document.createElement('script');
  // scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  // vizElement.parentNode.insertBefore(scriptElement, vizElement);
};


  //     document.querySelector('.reopening-tableau-embed').innerHTML = `<div class='tableauPlaceholder' id='viz1598633253507' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pl&#47;Planforreducingcovid-19&#47;planforreducingcovid-19&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='Planforreducingcovid-19&#47;planforreducingcovid-19' /><param name='tabs' value='no' /><param name='toolbar' value='no' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pl&#47;Planforreducingcovid-19&#47;planforreducingcovid-19&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en' /></object></div>`;
 
      // Q: was this for tableau map?
export const replaceAllInMap = function (str) {
        let mapObj = {
          "&lt;": "<",
          "&gt;": ">",
          "’": '"',
          "”": '"',
        };
        var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
        return str.replace(re, function (matched) {
          return mapObj[matched.toLowerCase()];
        });
      };