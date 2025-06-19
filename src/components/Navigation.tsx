'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  UserIcon, 
  CakeIcon, 
  BoltIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { useAgent, AgentType } from '@/contexts/AgentContext';

const mainNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
] as const;

// Agent navigation will be populated from the context
interface AgentNavItem {
  id: AgentType;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { setActiveAgent, allAgents } = useAgent();

  // Convert agent metadata to navigation items
  const agentNavigation = Object.values(allAgents).map(agent => ({
    id: agent.id,
    name: agent.name,
    href: `/workspace/${agent.id}`,
    icon: agent.icon,
    description: agent.description || ''
  }));

  const handleAgentChange = (agentId: AgentType, href: string) => {
    setActiveAgent(agentId);
    router.push(href);
  };

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        {/* Main Navigation */}
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400 px-2">Main</div>
          <ul role="list" className="mt-2 space-y-1">
            {mainNavigation.map((item) => {
              const isActive = pathname ? pathname === item.href : false;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>

        {/* Agent Navigation */}
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400 px-2">Agents</div>
          <ul role="list" className="mt-2 space-y-1">
            {agentNavigation.map((item) => {
              const isActive = pathname ? pathname.startsWith(`/workspace/${item.id}`) : false;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleAgentChange(item.id, item.href)}
                    className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-medium ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <div className="flex-1 text-left">
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>

        {/* Settings */}
        <li className="mt-auto">
          <a
            href="#"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Cog6ToothIcon className="h-5 w-5 shrink-0" />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
}
