"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import Logo from "@/public/logo.svg";
import womenAvatar from "@/public/images/womenAvatar.svg";
import building from "@/public/images/building.svg";
import userAccount from "@/public/icons/account-user.svg";
import { MenuContainer, MenuItem } from "./Menu";
import { useAppContext } from "@/lib/context/app-context";
import manage_org_blocker from "@/public/images/manage_org_blocker.svg";
import CreateOrgFirstModal from "@/app/(main)/events/components/CreateOrgFirstModal";
const Navbar = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined
  );
  const [showSideBar, setShowSideBar] = useState(false);
  const { isAuthenticated, user, showOrgBlocker, toggleOrganizationBlocker } =
    useAppContext();

  console.log(user);

  const submenuLinks = {
    community: [
      { type: "link", text: "Discussions", href: "/discussions" },
      { type: "link", text: "Support", href: "/support" },
    ],
    account: [
      {
        type: "link",
        icon: (
          <svg
            width="24"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z"
              fill="black"
            />
          </svg>
        ),
        text: "Home",
        href: "/",
      },
      {
        type: "link",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.14 12.936C19.176 12.636 19.2 12.324 19.2 12C19.2 11.676 19.176 11.364 19.128 11.064L21.156 9.48002C21.336 9.33602 21.384 9.07202 21.276 8.86802L19.356 5.54402C19.236 5.32802 18.984 5.25602 18.768 5.32802L16.38 6.28802C15.876 5.90402 15.348 5.59202 14.76 5.35202L14.4 2.80802C14.364 2.56802 14.16 2.40002 13.92 2.40002H10.08C9.83998 2.40002 9.64799 2.56802 9.61199 2.80802L9.25199 5.35202C8.66398 5.59202 8.12399 5.91602 7.63199 6.28802L5.24398 5.32802C5.02798 5.24402 4.77598 5.32802 4.65598 5.54402L2.73598 8.86802C2.61598 9.08402 2.66398 9.33602 2.85598 9.48002L4.88398 11.064C4.83598 11.364 4.79998 11.688 4.79998 12C4.79998 12.312 4.82398 12.636 4.87198 12.936L2.84398 14.52C2.66398 14.664 2.61598 14.928 2.72398 15.132L4.64398 18.456C4.76398 18.672 5.01598 18.744 5.23198 18.672L7.61998 17.712C8.12398 18.096 8.65198 18.408 9.23998 18.648L9.59999 21.192C9.64798 21.432 9.83998 21.6 10.08 21.6H13.92C14.16 21.6 14.364 21.432 14.388 21.192L14.748 18.648C15.336 18.408 15.876 18.084 16.368 17.712L18.756 18.672C18.972 18.756 19.224 18.672 19.344 18.456L21.264 15.132C21.384 14.916 21.336 14.664 21.144 14.52L19.14 12.936ZM12 15.6C10.02 15.6 8.39998 13.98 8.39998 12C8.39998 10.02 10.02 8.40002 12 8.40002C13.98 8.40002 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z"
              fill="#191D21"
            />
          </svg>
        ),
        text: "Profile",
        href: `/profile/${user?.userId}`,
      },
      {
        type: "link",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.56 5.44L15.11 6.89C15.9912 7.42057 16.7203 8.16984 17.2266 9.06515C17.733 9.96046 17.9994 10.9714 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12C6 9.83 7.16 7.94 8.88 6.88L7.44 5.44C6.3779 6.17279 5.50984 7.15277 4.91058 8.29555C4.31132 9.43832 3.99882 10.7096 4 12C4 14.1217 4.84286 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.28 18.64 6.88 16.56 5.44ZM13 3H11V13H13"
              fill="black"
            />
          </svg>
        ),
        text: "Logout",
        href: "/account/logout",
      },
    ],
    userWithOrgMenu: [
      {
        type: "link",
        icon: (
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25 11C4.05109 11 3.86032 11.079 3.71967 11.2197C3.57902 11.3603 3.5 11.5511 3.5 11.75C3.5 11.9489 3.57902 12.1397 3.71967 12.2803C3.86032 12.421 4.05109 12.5 4.25 12.5H4.75C4.94891 12.5 5.13968 12.421 5.28033 12.2803C5.42098 12.1397 5.5 11.9489 5.5 11.75C5.5 11.5511 5.42098 11.3603 5.28033 11.2197C5.13968 11.079 4.94891 11 4.75 11H4.25ZM3.5 8.25C3.5 8.05109 3.57902 7.86032 3.71967 7.71967C3.86032 7.57902 4.05109 7.5 4.25 7.5H4.75C4.94891 7.5 5.13968 7.57902 5.28033 7.71967C5.42098 7.86032 5.5 8.05109 5.5 8.25C5.5 8.44891 5.42098 8.63968 5.28033 8.78033C5.13968 8.92098 4.94891 9 4.75 9H4.25C4.05109 9 3.86032 8.92098 3.71967 8.78033C3.57902 8.63968 3.5 8.44891 3.5 8.25ZM4.25 4C4.05109 4 3.86032 4.07902 3.71967 4.21967C3.57902 4.36032 3.5 4.55109 3.5 4.75C3.5 4.94891 3.57902 5.13968 3.71967 5.28033C3.86032 5.42098 4.05109 5.5 4.25 5.5H4.75C4.94891 5.5 5.13968 5.42098 5.28033 5.28033C5.42098 5.13968 5.5 4.94891 5.5 4.75C5.5 4.55109 5.42098 4.36032 5.28033 4.21967C5.13968 4.07902 4.94891 4 4.75 4H4.25ZM7 11.75C7 11.5511 7.07902 11.3603 7.21967 11.2197C7.36032 11.079 7.55109 11 7.75 11H8.25C8.44891 11 8.63968 11.079 8.78033 11.2197C8.92098 11.3603 9 11.5511 9 11.75C9 11.9489 8.92098 12.1397 8.78033 12.2803C8.63968 12.421 8.44891 12.5 8.25 12.5H7.75C7.55109 12.5 7.36032 12.421 7.21967 12.2803C7.07902 12.1397 7 11.9489 7 11.75ZM7.75 7.5C7.55109 7.5 7.36032 7.57902 7.21967 7.71967C7.07902 7.86032 7 8.05109 7 8.25C7 8.44891 7.07902 8.63968 7.21967 8.78033C7.36032 8.92098 7.55109 9 7.75 9H8.25C8.44891 9 8.63968 8.92098 8.78033 8.78033C8.92098 8.63968 9 8.44891 9 8.25C9 8.05109 8.92098 7.86032 8.78033 7.71967C8.63968 7.57902 8.44891 7.5 8.25 7.5H7.75ZM7 4.75C7 4.55109 7.07902 4.36032 7.21967 4.21967C7.36032 4.07902 7.55109 4 7.75 4H8.25C8.44891 4 8.63968 4.07902 8.78033 4.21967C8.92098 4.36032 9 4.55109 9 4.75C9 4.94891 8.92098 5.13968 8.78033 5.28033C8.63968 5.42098 8.44891 5.5 8.25 5.5H7.75C7.55109 5.5 7.36032 5.42098 7.21967 5.28033C7.07902 5.13968 7 4.94891 7 4.75ZM11.25 11C11.0511 11 10.8603 11.079 10.7197 11.2197C10.579 11.3603 10.5 11.5511 10.5 11.75C10.5 11.9489 10.579 12.1397 10.7197 12.2803C10.8603 12.421 11.0511 12.5 11.25 12.5H11.75C11.9489 12.5 12.1397 12.421 12.2803 12.2803C12.421 12.1397 12.5 11.9489 12.5 11.75C12.5 11.5511 12.421 11.3603 12.2803 11.2197C12.1397 11.079 11.9489 11 11.75 11H11.25ZM10.5 8.25C10.5 8.05109 10.579 7.86032 10.7197 7.71967C10.8603 7.57902 11.0511 7.5 11.25 7.5H11.75C11.9489 7.5 12.1397 7.57902 12.2803 7.71967C12.421 7.86032 12.5 8.05109 12.5 8.25C12.5 8.44891 12.421 8.63968 12.2803 8.78033C12.1397 8.92098 11.9489 9 11.75 9H11.25C11.0511 9 10.8603 8.92098 10.7197 8.78033C10.579 8.63968 10.5 8.44891 10.5 8.25ZM11.25 4C11.0511 4 10.8603 4.07902 10.7197 4.21967C10.579 4.36032 10.5 4.55109 10.5 4.75C10.5 4.94891 10.579 5.13968 10.7197 5.28033C10.8603 5.42098 11.0511 5.5 11.25 5.5H11.75C11.9489 5.5 12.1397 5.42098 12.2803 5.28033C12.421 5.13968 12.5 4.94891 12.5 4.75C12.5 4.55109 12.421 4.36032 12.2803 4.21967C12.1397 4.07902 11.9489 4 11.75 4H11.25Z"
              fill="#106840"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 19C0 19.5304 0.210714 20.0391 0.585786 20.4142C0.960859 20.7893 1.46957 21 2 21H5.75C5.94891 21 6.13968 20.921 6.28033 20.7803C6.42098 20.6397 6.5 20.4489 6.5 20.25V18H9.5V20.25C9.5 20.664 9.836 21 10.25 21H14C14.092 21 14.183 20.994 14.272 20.982C14.3265 20.9941 14.3822 21.0002 14.438 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V11C20 10.6895 19.9277 10.3833 19.7889 10.1056C19.65 9.82786 19.4484 9.58629 19.2 9.4L18.7 9.025C18.5409 8.90565 18.3408 8.85441 18.1439 8.88254C17.947 8.91067 17.7693 9.01587 17.65 9.175C17.5307 9.33413 17.4794 9.53415 17.5075 9.73107C17.5357 9.92798 17.6409 10.1057 17.8 10.225L18.3 10.6C18.3621 10.6466 18.4125 10.707 18.4472 10.7764C18.4819 10.8458 18.5 10.9224 18.5 11V19C18.5 19.1326 18.4473 19.2598 18.3536 19.3536C18.2598 19.4473 18.1326 19.5 18 19.5H15.937C15.978 19.34 16 19.173 16 19V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V19ZM2 19.5C1.86739 19.5 1.74021 19.4473 1.64645 19.3536C1.55268 19.2598 1.5 19.1326 1.5 19V2C1.5 1.86739 1.55268 1.74021 1.64645 1.64645C1.74021 1.55268 1.86739 1.5 2 1.5H14C14.1326 1.5 14.2598 1.55268 14.3536 1.64645C14.4473 1.74021 14.5 1.86739 14.5 2V19C14.5 19.1326 14.4473 19.2598 14.3536 19.3536C14.2598 19.4473 14.1326 19.5 14 19.5H11V17.25C11 17.0511 10.921 16.8603 10.7803 16.7197C10.6397 16.579 10.4489 16.5 10.25 16.5H5.75C5.55109 16.5 5.36032 16.579 5.21967 16.7197C5.07902 16.8603 5 17.0511 5 17.25V19.5H2Z"
              fill="#106840"
            />
          </svg>
        ),
        text: "View Organization",
        href: `/organization/${user?.organizationId}`,
      },
      {
        type: "link",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 15H6.75C6.15326 15 5.58097 15.2371 5.15901 15.659C4.73705 16.081 4.5 16.6533 4.5 17.25V18.75H6V17.25C6 17.0511 6.07902 16.8603 6.21967 16.7197C6.36032 16.579 6.55109 16.5 6.75 16.5H11.25C11.4489 16.5 11.6397 16.579 11.7803 16.7197C11.921 16.8603 12 17.0511 12 17.25V18.75H13.5V17.25C13.5 16.6533 13.2629 16.081 12.841 15.659C12.419 15.2371 11.8467 15 11.25 15ZM9 14.25C9.59334 14.25 10.1734 14.0741 10.6667 13.7444C11.1601 13.4148 11.5446 12.9462 11.7716 12.3981C11.9987 11.8499 12.0581 11.2467 11.9424 10.6647C11.8266 10.0828 11.5409 9.54824 11.1213 9.12868C10.7018 8.70912 10.1672 8.4234 9.58527 8.30765C9.00333 8.19189 8.40013 8.2513 7.85195 8.47836C7.30377 8.70543 6.83524 9.08994 6.50559 9.58329C6.17595 10.0766 6 10.6567 6 11.25C6 12.0457 6.31607 12.8087 6.87868 13.3713C7.44129 13.9339 8.20435 14.25 9 14.25ZM9 9.75C9.29667 9.75 9.58668 9.83798 9.83335 10.0028C10.08 10.1676 10.2723 10.4019 10.3858 10.676C10.4994 10.9501 10.5291 11.2517 10.4712 11.5426C10.4133 11.8336 10.2704 12.1009 10.0607 12.3107C9.85088 12.5204 9.58361 12.6633 9.29264 12.7212C9.00166 12.7791 8.70006 12.7494 8.42598 12.6358C8.15189 12.5223 7.91762 12.33 7.7528 12.0834C7.58797 11.8367 7.5 11.5467 7.5 11.25C7.5 10.8522 7.65804 10.4706 7.93934 10.1893C8.22064 9.90804 8.60218 9.75 9 9.75Z"
              fill="#106840"
            />
            <path
              d="M21 14.25V21H3V6H12V4.5H3C2.60218 4.5 2.22064 4.65804 1.93934 4.93934C1.65804 5.22064 1.5 5.60218 1.5 6V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V14.25H21Z"
              fill="#106840"
            />
            <path
              d="M15 14.25H19.5V15.75H15V14.25ZM16.5 17.25H19.5V18.75H16.5V17.25ZM24 7.5V6H22.4242C22.3275 5.53052 22.1411 5.08411 21.8752 4.68525L22.9928 3.56775L21.9323 2.50725L20.8148 3.62475C20.4159 3.35888 19.9695 3.17248 19.5 3.07575V1.5H18V3.07575C17.5305 3.17248 17.0841 3.35888 16.6852 3.62475L15.5677 2.50725L14.5073 3.56775L15.6248 4.68525C15.3589 5.08411 15.1725 5.53052 15.0757 6H13.5V7.5H15.0757C15.1725 7.96948 15.3589 8.41589 15.6248 8.81475L14.5073 9.93225L15.5677 10.9928L16.6852 9.87525C17.0841 10.1411 17.5305 10.3275 18 10.4242V12H19.5V10.4242C19.9695 10.3275 20.4159 10.1411 20.8148 9.87525L21.9323 10.9928L22.9928 9.93225L21.8752 8.81475C22.1411 8.41589 22.3275 7.96948 22.4242 7.5H24ZM18.75 9C18.305 9 17.87 8.86804 17.5 8.62081C17.13 8.37357 16.8416 8.02217 16.6713 7.61104C16.501 7.1999 16.4564 6.7475 16.5432 6.31105C16.63 5.87459 16.8443 5.47368 17.159 5.15901C17.4737 4.84434 17.8746 4.63005 18.311 4.54323C18.7475 4.45642 19.1999 4.50097 19.611 4.67127C20.0222 4.84157 20.3736 5.12996 20.6208 5.49997C20.868 5.86998 21 6.30499 21 6.75C20.9994 7.34655 20.7622 7.9185 20.3403 8.34033C19.9185 8.76216 19.3466 8.9994 18.75 9Z"
              fill="#106840"
            />
          </svg>
        ),
        text: "Manage Organization",
        href: "/organization/manage/dashboard",
      },
      {
        type: "link",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19V8H5V19H19ZM16 1H18V3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 20.11 20.11 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1ZM11 9.5H13V12.5H16V14.5H13V17.5H11V14.5H8V12.5H11V9.5Z"
              fill="#106840"
            />
          </svg>
        ),
        text: "Add Event",
        href: "/events/create",
      },
    ],
    userWithNoOrgMenu: [
      {
        type: "link",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.9043 16.5207 13 16.2833 13 16V13H16.025C16.3083 13 16.5417 12.904 16.725 12.712C16.9083 12.5207 17 12.2833 17 12C17 11.7167 16.904 11.479 16.712 11.287C16.5207 11.0957 16.2833 11 16 11H13V7.975C13 7.69167 12.9043 7.45833 12.713 7.275C12.521 7.09167 12.2833 7 12 7C11.7167 7 11.4793 7.09567 11.288 7.287C11.096 7.479 11 7.71667 11 8V11H7.975C7.69167 11 7.45833 11.0957 7.275 11.287C7.09167 11.479 7 11.7167 7 12C7 12.2833 7.09567 12.5207 7.287 12.712C7.479 12.904 7.71667 13 8 13H11V16.025C11 16.3083 11.096 16.5417 11.288 16.725C11.4793 16.9083 11.7167 17 12 17ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22Z"
              fill="#106840"
            />
          </svg>
        ),
        text: "Add Organization",
        href: "/organization/create",
      },
      {
        type: "button",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.25 15H6.75C6.15326 15 5.58097 15.2371 5.15901 15.659C4.73705 16.081 4.5 16.6533 4.5 17.25V18.75H6V17.25C6 17.0511 6.07902 16.8603 6.21967 16.7197C6.36032 16.579 6.55109 16.5 6.75 16.5H11.25C11.4489 16.5 11.6397 16.579 11.7803 16.7197C11.921 16.8603 12 17.0511 12 17.25V18.75H13.5V17.25C13.5 16.6533 13.2629 16.081 12.841 15.659C12.419 15.2371 11.8467 15 11.25 15ZM9 14.25C9.59334 14.25 10.1734 14.0741 10.6667 13.7444C11.1601 13.4148 11.5446 12.9462 11.7716 12.3981C11.9987 11.8499 12.0581 11.2467 11.9424 10.6647C11.8266 10.0828 11.5409 9.54824 11.1213 9.12868C10.7018 8.70912 10.1672 8.4234 9.58527 8.30765C9.00333 8.19189 8.40013 8.2513 7.85195 8.47836C7.30377 8.70543 6.83524 9.08994 6.50559 9.58329C6.17595 10.0766 6 10.6567 6 11.25C6 12.0457 6.31607 12.8087 6.87868 13.3713C7.44129 13.9339 8.20435 14.25 9 14.25ZM9 9.75C9.29667 9.75 9.58668 9.83798 9.83335 10.0028C10.08 10.1676 10.2723 10.4019 10.3858 10.676C10.4994 10.9501 10.5291 11.2517 10.4712 11.5426C10.4133 11.8336 10.2704 12.1009 10.0607 12.3107C9.85088 12.5204 9.58361 12.6633 9.29264 12.7212C9.00166 12.7791 8.70006 12.7494 8.42598 12.6358C8.15189 12.5223 7.91762 12.33 7.7528 12.0834C7.58797 11.8367 7.5 11.5467 7.5 11.25C7.5 10.8522 7.65804 10.4706 7.93934 10.1893C8.22064 9.90804 8.60218 9.75 9 9.75Z"
              fill="#106840"
            />
            <path
              d="M21 14.25V21H3V6H12V4.5H3C2.60218 4.5 2.22064 4.65804 1.93934 4.93934C1.65804 5.22064 1.5 5.60218 1.5 6V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V14.25H21Z"
              fill="#106840"
            />
            <path
              d="M15 14.25H19.5V15.75H15V14.25ZM16.5 17.25H19.5V18.75H16.5V17.25ZM24 7.5V6H22.4242C22.3275 5.53052 22.1411 5.08411 21.8752 4.68525L22.9928 3.56775L21.9323 2.50725L20.8148 3.62475C20.4159 3.35888 19.9695 3.17248 19.5 3.07575V1.5H18V3.07575C17.5305 3.17248 17.0841 3.35888 16.6852 3.62475L15.5677 2.50725L14.5073 3.56775L15.6248 4.68525C15.3589 5.08411 15.1725 5.53052 15.0757 6H13.5V7.5H15.0757C15.1725 7.96948 15.3589 8.41589 15.6248 8.81475L14.5073 9.93225L15.5677 10.9928L16.6852 9.87525C17.0841 10.1411 17.5305 10.3275 18 10.4242V12H19.5V10.4242C19.9695 10.3275 20.4159 10.1411 20.8148 9.87525L21.9323 10.9928L22.9928 9.93225L21.8752 8.81475C22.1411 8.41589 22.3275 7.96948 22.4242 7.5H24ZM18.75 9C18.305 9 17.87 8.86804 17.5 8.62081C17.13 8.37357 16.8416 8.02217 16.6713 7.61104C16.501 7.1999 16.4564 6.7475 16.5432 6.31105C16.63 5.87459 16.8443 5.47368 17.159 5.15901C17.4737 4.84434 17.8746 4.63005 18.311 4.54323C18.7475 4.45642 19.1999 4.50097 19.611 4.67127C20.0222 4.84157 20.3736 5.12996 20.6208 5.49997C20.868 5.86998 21 6.30499 21 6.75C20.9994 7.34655 20.7622 7.9185 20.3403 8.34033C19.9185 8.76216 19.3466 8.9994 18.75 9Z"
              fill="#106840"
            />
          </svg>
        ),
        text: "Manage Organization",
        href: "#",
      },
      {
        type: "button",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19V8H5V19H19ZM16 1H18V3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 20.11 20.11 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1ZM11 9.5H13V12.5H16V14.5H13V17.5H11V14.5H8V12.5H11V9.5Z"
              fill="#106840"
            />
          </svg>
        ),
        text: "Add Event",
        href: "/add-event",
      },
    ],
  };
  const pathname = usePathname();
  const router = useRouter();

  const handleSideMenu = () => {
    setShowSideBar((prevState) => !prevState);
  };
  const navigateToCreateOgr = () => {
    router.push("/organization/create");
    toggleOrganizationBlocker();
  };

  return (
    <header>
      <nav className="fixed top-0 inset-x-0 z-[250] font-sora flex items-center justify-between text-secondaryGreen bg-primaryWhite px-2 md:px-8 py-0">
        <div className="w-1/3 flex gap-4 items-center justify-between md:py-2">
          {/*side menu button */}
          <button className="lg:hidden block" onClick={handleSideMenu}>
            <svg
              width="35"
              height="31"
              viewBox="0 0 35 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7.96732H28.6667"
                stroke="currentColor"
                stroke-width="2.125"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 15.9673H28.6667"
                stroke="currentColor"
                stroke-width="2.125"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 23.9673H28.6667"
                stroke="currentColor"
                stroke-width="2.125"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="w-full">
            <Link href="/" className="w-fit flex items-center space-x-2">
              <Image
                src={Logo.src}
                alt=""
                className="w-[3rem] md:w-[4rem] aspect-auto"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
        {showSideBar && (
          <div className="absolute bg-white-100 w-[70%] h-screen z-10 top-0 px-8 py-5 ">
            <div className="flex justify-between">
              <Link href="/" className="w-fit flex items-center space-x-2">
                <Image
                  src={Logo.src}
                  alt=""
                  className="w-[3rem] md:w-[4rem] aspect-auto"
                  width={80}
                  height={80}
                />
              </Link>
              <button onClick={handleSideMenu}>
                <svg
                  width="25"
                  height="31"
                  viewBox="0 0 25 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.29529 5.93799L19.8578 22.4179"
                    stroke="black"
                    stroke-width="2.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.88513 22.1553L20.4486 5.67627"
                    stroke="black"
                    stroke-width="2.125"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-5 mt-[100px] text-lg">
              <MenuItem link="/about" subLinks={null} text="about" />
              <MenuItem link="/category" subLinks={null} text="category" />
              <MenuItem link="/events" subLinks={null} text="events" />
              <MenuItem link="#" subLinks={null} text="community" />
              <MenuItem link="/projects" subLinks={null} text="projects" />
              {/* <MenuItem link="/blog" subLinks={null} text="blog" /> */}
            </div>
            <div className="absolute bottom-0 text-sm">
              <p>© Copyright 2022. VHDO</p>
            </div>
          </div>
        )}
        <div className="hidden lg:flex items-center justify-center w-1/3 mx-auto space-x-4 text-base font-light ">
          <MenuContainer>
            <MenuItem link="/about" subLinks={null} text="about" />
            <MenuItem link="/category" subLinks={null} text="category" />
            <MenuItem link="/events" subLinks={null} text="events" />
            <MenuItem
              link="#"
              subLinks={submenuLinks.community}
              text="community"
            />
            <MenuItem link="/projects" subLinks={null} text="projects" />
            <MenuItem link="/blog" subLinks={null} text="blog" />
          </MenuContainer>
        </div>

        <div className="w-fit lg:w-1/3 place-content-end flex items-center gap-5">
          {!isAuthenticated ? (
            <div className="flex items-center text-xs md:text-base">
              <Link
                href="/account/login"
                className="flex items-center gap-2 px-4 py-2 text-light"
                onClick={() => { }}
              >
                <Image
                  width={0.5}
                  height={0.5}
                  src={userAccount.src}
                  alt=""
                  className="w-[1.5rem] aspect-square object-contain"
                />
                Log in
              </Link>
              <Link
                href="/account/sign-up"
                className="bg-btnWarning px-4 py-2 rounded-md font-light text-white-100"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <MenuContainer>
              <MenuItem
                link=""
                subLinks={submenuLinks.account}
                text=""
                icon={<Image src={womenAvatar} alt="Women avatar" />}
              />
              <MenuItem
                link=""
                subLinks={
                  user?.role == "USER"
                    ? submenuLinks.userWithNoOrgMenu
                    : submenuLinks.userWithOrgMenu
                }
                text=""
                icon={
                  <div className="border w-[40px] h-[40px] flex justify-center items-center rounded-full">
                    <Image src={building} alt="building icon" />
                  </div>
                }
                showChevron={false}
              />
            </MenuContainer>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
