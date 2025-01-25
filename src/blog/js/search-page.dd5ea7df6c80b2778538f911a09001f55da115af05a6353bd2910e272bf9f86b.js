(()=>{var l,i;async function c(){i=(await(await fetch("/blog/index.json")).json()).items,l=lunr(function(){this.ref("url"),this.field("title"),this.field("content"),this.field("description"),i.forEach(e=>this.add(e))})}c();var a=document.getElementById("search-input"),n=document.getElementById("search-results");a.addEventListener("input",()=>{let t=a.value.trim();if(t.length<3){n.innerHTML="<li>Type at least 3 characters to search.</li>";return}let s=l.search(t).map(e=>i.find(r=>r.url===e.ref));s.length?n.innerHTML=s.map(e=>`<li class="rounded overflow-hidden shadow bg-zinc-300 text-black hover:shadow-lg transition transform hover:scale-105 hover:bg-blue-50">
            <a href="${e.url}" class="flex items-center p-4 space-x-4">
              <img src="${e.image||"/default-image.jpg"}" alt="${e.title}" class="w-24 h-24 rounded object-cover">
              <div>
                <h3 class="font-bold text-lg">${e.title}</h3>
                <p class="text-sm text-gray-600">${e.description||""}</p>
              </div>
            </a>
          </li>`).join(""):n.innerHTML="<li>No results found.</li>"});})();
