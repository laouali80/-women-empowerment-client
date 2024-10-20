import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/Popover';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/UI/Tooltip';
import ThreeDots from '@/components/Common/Icons/ThreeDots';

type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  link?: string;
  isButton?: boolean;
  condition?: boolean;
  onClick?: () => void;
};

type ThreeDotsMenuProps = {
  menu: MenuItem[];
  label?: React.ReactNode;
};

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({
  menu,
  label = 'options menu',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hover:bg-primary/20 relative flex aspect-square w-12 items-center justify-center rounded-full">
                <ThreeDots />
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="text-primaryWhite bg-primary font-quickSand border-none text-xs"
            >
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-primaryWhite absolute -top-[24px] right-7 w-48 overflow-hidden rounded shadow-md"
      >
        <ul className="font-quickSand text-gray-200 flex flex-col items-start justify-center gap-2">
          {menu.map((item, index) => {
            if (item.condition === false) return null;
            return (
              <React.Fragment key={index}>
                {item.isButton ? (
                  <li className="flex w-full items-center justify-start gap-2 whitespace-nowrap">
                    <button
                      onClick={() => {
                        item.onClick && item.onClick();
                        setIsOpen(false);
                      }}
                      className="font-quickSand text-primary hover:text-btnWarning relative flex cursor-pointer gap-4 text-xs font-medium transition duration-300 ease-in-out hover:no-underline"
                    >
                      {item.icon}

                      {item.title}
                    </button>
                  </li>
                ) : (
                  <li className="flex w-full items-center justify-start whitespace-nowrap">
                    <Link
                      href={item.link || ''}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        ' font-quickSand text-primary hover:text-btnWarning relative flex gap-4 text-xs font-medium transition duration-300 ease-in-out hover:no-underline'
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ThreeDotsMenu;
