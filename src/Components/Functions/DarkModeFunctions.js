function DarkModeLogoText () {
    return (<p style={{height:"10px"}}>Dark mode <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16"> <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/> </svg></p>)
}

function LightModeLogoText () {
    return(<p style={{height:"10px"}}>Light mode <svg width="20" height="20" version="1.1" viewBox="0 0 512 500" fill="white" xmlns="http://www.w3.org/2000/svg"> <rect x="193.96" y="115.38" width="160.46" height="343.74" stroke-width="3.3962"/> <rect x="156.84" y="115.28" width="24.169" height="343.74" stroke-width="1.3181"/> <path d="m163.24 115.28h51.024l-20.309 113.23c0-113.14-12.949-113.23-12.949-0.33562z" stroke-width="1.0711"/> <path d="m211.72 459.11h-51.024l20.309-113.23c0 113.14 12.949 113.23 12.949 0.33562z" stroke-width="1.0711"/> <rect transform="rotate(-7.9413)" x="117.49" y="105.01" width="51.024" height="10.07" stroke-width=".3278"/> <rect transform="scale(1,-1)" x="174.54" y="-109.82" width="186.59" height="24.169" stroke-width=".97111"/> <path d="m174.54 89.229h186.59l-22.48-27.357-164.11-0.38533z" stroke-width="1.0404"/> <g> <rect transform="scale(1,-1)" x="153.1" y="-494.2" width="205.8" height="24.169" stroke-width="1.0199"/> <rect x="143.9" y="21.295" width="233.66" height="22.826" ry="11.393" stroke-width="3.8466"/> <rect transform="rotate(266.71)" x="-369.17" y="406.15" width="233.66" height="17.094" ry="8.5323" stroke-width="3.3288"/> </g> <path d="m377.56 27.83 52.757 83.181c1.667 2.6284 3.7308 10.965 0.65838 11.462l-11.459 1.8538c-3.0726 0.4969-7.8602 1.0764-9.4008-1.6282l-52.232-91.697c-1.5405-2.7044 0.0247-3.7576 2.6449-5.4373l6.6607-4.2699c2.6202-1.6797 8.7044 3.9071 10.371 6.5355z" stroke-width="2.3102"/> <ellipse transform="rotate(26.863)" cx="162.75" cy="63.586" rx="23.262" ry="42.645" fill="none" stroke="#000" stroke-width="14.74"/> </svg></p>)
}

export function DarkModeSwitch(){
    if (localStorage.getItem("darkMode") == 0) {
        localStorage.setItem("darkMode",1)                                
    }else{
        localStorage.setItem("darkMode",0)
    }
}

export function DisplayDarkModeLogos(){
    return(
        localStorage.getItem("darkMode")==0? <DarkModeLogoText/> :<LightModeLogoText/>
    )
}

export function DarkModeBodySetter(){
    if (localStorage.getItem("darkMode") == 1) {
        document.body.classList.add('dark');
    }else{
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
        }
    }
}