import React, { HTMLAttributes } from 'react'

interface IsettingsIcon extends HTMLAttributes<SVGElement> {
  color?: string
  height?: string
  width?: string
}

export const DashboardIcon: React.FC<IsettingsIcon> = ({ width = '15px', height = '12px', color = '#E8E3E6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18.95 7.908">
      <path opacity="0.3" className="fill" fill={color} d="M17.512,18.926a1.628,1.628,0,0,0-1.626,1.626,1.611,1.611,0,0,0,.122.617l-3.3,2.794a1.62,1.62,0,0,0-2.183-.283L7.628,21.1a1.611,1.611,0,0,0,.184-.749,1.626,1.626,0,1,0-3.125.628L.345,24.665a.447.447,0,0,0,.579.681l4.324-3.673a1.613,1.613,0,0,0,1.765.073l2.953,2.63a1.626,1.626,0,1,0,3.125.629,1.649,1.649,0,0,0-.011-.185l3.484-2.951a1.625,1.625,0,1,0,.949-2.944ZM5.454,20.349a.732.732,0,1,1,.732.732A.733.733,0,0,1,5.454,20.349Zm6.011,5.389a.733.733,0,1,1,.732-.733A.734.734,0,0,1,11.465,25.738Zm6.047-4.454a.732.732,0,1,1,.732-.732A.733.733,0,0,1,17.512,21.284Z" transform="translate(-0.187 -18.723)" />
    </svg>
  )
}

export const ProfileIcon: React.FC<IsettingsIcon> = ({ width = '15px', height = '12px', color = '#E8E3E6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14.975 12.445">
      <g id="ic_contacts" transform="translate(0.625 0.625)" opacity="0.3">
        <ellipse id="Elipse_4" data-name="Elipse 4" cx="2.073" cy="2.073" rx="2.073" ry="2.073" transform="translate(4.79 2.436)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
        <path id="Trazado_210" data-name="Trazado 210" d="M280.5,193.75a3.627,3.627,0,0,0-3.6,3.179,5.229,5.229,0,0,0,7.195,0A3.626,3.626,0,0,0,280.5,193.75Z" transform="translate(-273.633 -187.168)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
        <path id="Trazado_211" data-name="Trazado 211" d="M302.073,162a2.07,2.07,0,0,0-1.857,2.991,2.073,2.073,0,0,1,.449.6A2.072,2.072,0,1,0,302.073,162Z" transform="translate(-291.945 -162)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
        <path id="Trazado_212" data-name="Trazado 212" d="M280.5,193.75a3.627,3.627,0,0,0-3.6,3.179,5.229,5.229,0,0,0,7.195,0A3.626,3.626,0,0,0,280.5,193.75Z" transform="translate(-273.633 -187.168)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
        <path id="Trazado_213" data-name="Trazado 213" d="M272.43,164.991a2.078,2.078,0,1,0-.449.6A2.073,2.073,0,0,1,272.43,164.991Z" transform="translate(-266.976 -162)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
        <g id="Grupo_10" data-name="Grupo 10" transform="translate(0 4.146)">
          <path id="Trazado_214" data-name="Trazado 214" d="M297.571,186.612a5.214,5.214,0,0,0,3.542-1.433,3.62,3.62,0,0,0-4.8-2.973c0,.052.008.1.008.157a2.073,2.073,0,0,1-2.073,2.073A3.624,3.624,0,0,1,297.571,186.612Z" transform="translate(-287.387 -182)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
          <path id="Trazado_215" data-name="Trazado 215" d="M268.011,184.436a2.073,2.073,0,0,1-2.073-2.073c0-.053,0-.1.008-.157a3.62,3.62,0,0,0-4.8,2.973,5.215,5.215,0,0,0,3.542,1.433A3.623,3.623,0,0,1,268.011,184.436Z" transform="translate(-261.148 -182)" fill="none" className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </g>
    </svg>
  )
}

export const PaymentIcon: React.FC<IsettingsIcon> = ({ width = '15px', height = '12px', color = '#E8E3E6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 11">
      <g opacity="0.3" transform="translate(-33 -100.5)">
        <g fill="none" transform="translate(33 100.5)" className="stroke" stroke={color} strokeWidth="1.5px">
          <rect width="15" height="11" rx="2" stroke="none" />
          <rect fill="none" x="0.75" y="0.75" width="13.5" height="9.5" rx="1.25" />
        </g>
        <rect width="14" height="3" transform="translate(34 103.5)" className="fill" fill={color} />
      </g>
    </svg>
  )
}

export const SupportIcon: React.FC<IsettingsIcon> = ({ width = '15px', height = '12px', color = '#E8E3E6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 11">
      <g transform="translate(-33 -100.5)" opacity="0.3">
        <g className="stroke" stroke={color} strokeWidth="1.5px" fill="none" transform="translate(33 100.5)">
          <rect width="15" height="11" rx="2" stroke="none" />
          <rect fill="none" x="0.75" y="0.75" width="13.5" height="9.5" rx="1.25" />
        </g>
        <path className="stroke" stroke={color} strokeLinejoin="round" strokeWidth="1.5px" fill="none" d="M141,73.253l6.4,4.621L153.713,73" transform="translate(-106.669 28.256)" />
      </g>
    </svg>
  )
}

export const SendIcon: React.FC<IsettingsIcon> = ({ width = '24px', height = '25px', color = '#E8E3E6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24.25 25.707">
      <g transform="matrix(0.259, 0.966, -0.966, 0.259, 18.705, 0)">
        <path fill={color} d="M21.123.6a1.489,1.489,0,0,0-1.562-.56L1.153,4.5a1.512,1.512,0,0,0-.378,2.79l6.5,3.627,1.6,7.267a1.5,1.5,0,0,0,1.241,1.165,1.531,1.531,0,0,0,.239.019,1.491,1.491,0,0,0,1.3-.749L21.217,2.267A1.5,1.5,0,0,0,21.123.6ZM7.98,9.289,2.192,6.058,17.338,2.393Zm2.481,7.884-1.43-6.467L18.2,3.948Z" transform="translate(0 0)" />
      </g>
    </svg>
  )
}

export const DownloadIcon: React.FC<IsettingsIcon> = ({ width = '20.8px', height = '20px', color = '#007aff', className = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20.8 20" className={className}>
      <g transform="translate(-35 -97)"><g transform="translate(35 97)">
        <g transform="translate(0 0)">
          <path
            fill={color}
            fillRule="evenodd"
            className="a"
            d="M426.8,742H430v8.8l2.525-2.4,1.774,1.649-5.775,5.55-5.724-5.525,1.725-1.674,2.275,2.4ZM418,755.6h3.2v3.2h14.4v-3.2h3.2V762H418Z"
            transform="translate(-418 -742)" />
          </g>
        </g>
      </g>
    </svg>
  )
}
