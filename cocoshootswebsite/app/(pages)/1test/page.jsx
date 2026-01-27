"use client";

import Nameinput from "../../ui/components/nameinput.jsx";
import Calendar from '../../ui/components/calendar.jsx';
import MenuBarIcon from '../../ui/components/menuicon';
import Facebookicon from '../../ui/components/facebook-icon';
import Link from "next/link";
import CardComponent from '../../ui/components/blogcard.tsx';
import polaroidframe from '../../ui/components/polaroidframe';

export default function Test() {
    return (
       
        <div>
            <p>Test</p>
     <Calendar />
     <Nameinput />
        <MenuBarIcon />
<polaroidframe/>

     </div>
    );
}
