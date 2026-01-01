"use client";
import React from "react";
import Nameinput from "../../ui/components/nameinput.jsx"; 
import Calendar from '../../ui/components/calendar.jsx';
import MenuBarIcon from '../../ui/components/menuicon';
import InlineSwitch from '../../ui/components/switch';
import Facebookicon from '../../ui/components/facebook-icon';
import Link from "next/link";

export default function Test() {
    return (
       
        <div>
            <p>Test</p>
     <Calendar />
     <Nameinput />
        <MenuBarIcon />
        <InlineSwitch />
        <Facebookicon />
        <Link href="/login">Login</Link>
     </div>
    );
}
