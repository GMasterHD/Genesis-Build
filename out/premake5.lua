outdir = "%{cfg.system}/%{cfg.longname}/%{prj.name}"

workspace "Genesis Engine"
	configurations { "Debug", "Release", "Dist" }
	architecture "x86_64

	group "GenesisPackages"
		include "genesis_packages/spdlog/premake5.lua"

	group ""
		include "projects/Sandbox.lua
		include "projects/Genesis Core.lua
