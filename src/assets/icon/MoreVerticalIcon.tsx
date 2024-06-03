import common from '@/styles/common';

const MoreVerticalIcon = ({
  color = common.colors.gray[900],
  size = 24,
}: IconPropsType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.25 18C13.25 17.3096 12.6904 16.75 12 16.75C11.3096 16.75 10.75 17.3096 10.75 18C10.75 18.6904 11.3096 19.25 12 19.25C12.6904 19.25 13.25 18.6904 13.25 18Z'
        fill={color}
      />
      <path
        d='M13.25 12C13.25 11.3096 12.6904 10.75 12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12Z'
        fill={color}
      />
      <path
        d='M13.25 6C13.25 5.30964 12.6904 4.75 12 4.75C11.3096 4.75 10.75 5.30964 10.75 6C10.75 6.69036 11.3096 7.25 12 7.25C12.6904 7.25 13.25 6.69036 13.25 6Z'
        fill={color}
      />
    </svg>
  );
};

export default MoreVerticalIcon;
