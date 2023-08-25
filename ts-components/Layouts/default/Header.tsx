import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
	const [showWoodSubMenu, setShowWoodSubMenu] = useState(false);
	const [showSteelSubMenu, setShowSteelSubMenu] = useState(false);
	return (
		<section className="header-section">
			<Link href="/">
				<div className="logo"></div>
			</Link>
			<div className="menus">
				<ul className="menu-list">
					<li className="menu">
						<Link href="/intro">회사소개</Link>
					</li>
					<li
						className="menu"
						onMouseEnter={() => {
							setShowWoodSubMenu(true);
						}}
						onMouseLeave={() => {
							setShowWoodSubMenu(false);
						}}
					>
						<Link href="/wood">합성목재</Link>
						<ul
							className={`sub-menu ${
								showWoodSubMenu ? 'visible' : 'invisible'
							}`}
						>
							<li className="sub-menu-item">
								<Link href="/wood">데크&클립</Link>
							</li>
							<li className="sub-menu-item">
								<Link href="/fence">휀스&브라켓</Link>
							</li>
						</ul>
					</li>
					<li
						className="menu"
						onMouseEnter={() => {
							setShowSteelSubMenu(true);
						}}
						onMouseLeave={() => {
							setShowSteelSubMenu(false);
						}}
					>
						<Link href="/steelwork">연결철물&주춧돌</Link>
						<ul
							className={`sub-menu ${
								showSteelSubMenu ? 'visible' : 'invisible'
							}`}
						>
							<li className="sub-menu-item">
								<Link href="/steelwork">연결철물</Link>
							</li>
							<li className="sub-menu-item">
								<Link href="/stone">주춧돌</Link>
							</li>
						</ul>
					</li>
					<li className="menu">
						<Link href="/facility">공장 및 목재창고</Link>
					</li>
					{/* <li className="menu"><Link href="/service">고객센터</Link></li> */}
				</ul>
			</div>
		</section>
	);
}
