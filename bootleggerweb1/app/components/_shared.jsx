const navItems = [
  { label: 'Menu', icon: 'menu' },
  { label: 'Our Story', icon: 'story' },
  { label: 'Entertainment', icon: 'music' },
  { label: 'Awards', icon: 'star' },
  { label: 'Parties & Events', icon: 'party' },
  { label: 'About', icon: 'info' },
  { label: 'Shop', icon: 'bag' },
];

const NavIcon = ({ type }) => {
  const svgProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const iconSvgs = {
    menu: React.createElement('svg', svgProps, React.createElement('path', { d: 'M6 6h12M6 12h12M6 18h12' })),
    story: React.createElement('svg', svgProps, React.createElement('path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' }), React.createElement('path', { d: 'M12 6v12' }), React.createElement('path', { d: 'M8 6v2' }), React.createElement('path', { d: 'M16 6v2' })),
    music: React.createElement('svg', svgProps, React.createElement('path', { d: 'M9 18V5l12-2v13' }), React.createElement('circle', { cx: 6, cy: 18, r: 3 }), React.createElement('circle', { cx: 18, cy: 16, r: 3 })),
    star: React.createElement('svg', svgProps, React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })),
    party: React.createElement('svg', svgProps, React.createElement('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), React.createElement('circle', { cx: 9, cy: 7, r: 4 }), React.createElement('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }), React.createElement('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })),
    bag: React.createElement('svg', svgProps, React.createElement('path', { d: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' }), React.createElement('line', { x1: 3, y1: 6, x2: 21, y2: 6 }), React.createElement('path', { d: 'M16 10a4 4 0 0 1-8 0' })),
    info: React.createElement('svg', svgProps, React.createElement('circle', { cx: 12, cy: 12, r: 10 }), React.createElement('line', { x1: 12, y1: 16, x2: 12, y2: 12 }), React.createElement('line', { x1: 12, y1: 8, x2: 12.01, y2: 8 })),
  };
  return iconSvgs[type] || null;
};
