import styled, { css } from "styled-components";
import { deviceFunction } from "styles/styled-components/media-query";
export const Card = {
  Card: styled.div`
    margin-bottom: 1.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 100%;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    &.border-radius-lg {
      &,
      & > div {
        border-radius: 2.5rem;
      }
    }
  `,
  CardBody: styled.div<{ minHeight?: string; height?: string }>`
    flex: 1 1 auto;
    min-height: ${(props) => props.minHeight ?? "1px"};
    height: ${(props) => props.height ?? "auto"};
    padding: 1.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  `,
};
export const Grid = {
  GridContainer: styled.div.attrs(
    (props: { negativeMargin: number }): { negativeMargin: number } => ({
      negativeMargin: props.negativeMargin,
    })
  )`
    display: block;
    margin-left: ${(props) => -(props.negativeMargin ?? 10)}px;
    margin-right: ${(props) => -(props.negativeMargin ?? 10)}px;
  `,
  GridByDevice: styled.div<{
    conditionalDeviceSize?: keyof typeof deviceFunction;
    defaultColumnCount: number;
    conditionalColumnCount?: number;
    paddingSide?: number;
    paddingtTopAndBottom?: number;
    verticalAlign?: string;
  }>`
    ${(props) => {
      return css`
        display: inline-block;
        padding: ${props.paddingtTopAndBottom ?? "0"}px
          ${props.paddingSide ?? "10"}px;
        width: ${(100 / props.defaultColumnCount).toFixed(2)}%;
        vertical-align: ${props.verticalAlign ?? "top"};
        ${props.conditionalDeviceSize &&
        deviceFunction[props.conditionalDeviceSize](`
					width: ${
            props.conditionalColumnCount &&
            (100 / props.conditionalColumnCount).toFixed(2)
          }%;
				`)};
      `;
    }}
  `,
};
