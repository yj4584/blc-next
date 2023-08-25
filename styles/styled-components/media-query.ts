const size = {
	smWidth: 576,
	mdWidth: 768,
	lgWidth: 992,
	xlWidth: 1200,
	xxlWith: 1400,
};
export const device = {
	smLess: `(max-width: ${size.smWidth}px)`,
	sm: `(min-width: ${size.smWidth}px) and (max-width: ${size.mdWidth}px)`,
	mdLess: `(max-width: ${size.mdWidth}px)`,
	md: `(min-width: ${size.mdWidth}px) and (max-width: ${size.lgWidth}px)`,
	lgLess: `(max-width: ${size.lgWidth}px)`,
	lg: `(min-width: ${size.lgWidth}px) and (max-width: ${size.xlWidth}px)`,
	xlLess: `(max-width: ${size.xlWidth}px)`,
	xl: `(min-width: ${size.xlWidth}px) and (max-width: ${size.xxlWith}px)`,
	xxlLess: `(max-width: ${size.xxlWith}px)`,
	xxl: `(min-width: ${size.xxlWith}px)`,
};

export const deviceFunction = {
	deviceSmLess: (text: string) => {
		return `
            @media ${device.smLess} {
                ${text};
            }
        `;
	},
	deviceSm: (text: string) => {
		return `
            @media ${device.sm} {
                ${text};
            }
        `;
	},
	deviceMdLess: (text: string) => {
		return `
            @media ${device.mdLess} {
                ${text};
            }
        `;
	},
	deviceMd: (text: string) => {
		return `
            @media ${device.md} {
                ${text};
            }
        `;
	},
	deviceLgLess: (text: string) => {
		return `
            @media ${device.lgLess} {
                ${text};
            }
        `;
	},
	deviceLg: (text: string) => {
		return `
            @media ${device.lg} {
                ${text};
            }
        `;
	},
	deviceXLLess: (text: string) => {
		return `
            @media ${device.xlLess} {
                ${text};
            }
        `;
	},
	deviceXL: (text: string) => {
		return `
            @media ${device.xl} {
                ${text};
            }
        `;
	},
	deviceXXLLess: (text: string) => {
		return `
            @media ${device.xxlLess} {
                ${text};
            }
        `;
	},
	deviceXXL: (text: string) => {
		return `
            @media ${device.xxl} {
                ${text};
            }
        `;
	},
};
