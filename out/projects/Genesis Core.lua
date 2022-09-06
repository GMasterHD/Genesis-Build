group ""
project "Genesis Core"
	kind "StaticLib"
	location "%{wks.location}/Genesis/src/"
	language "C++"
	systemversion "latest"
	cppdialect "C++20"
	debugdir("%{wks.location}/bin/"..outdir)
	targetdir("%{wks.location}/bin/"..outdir)
	objdir("%{wks.location}/bin-int/"..outdir)

	files { "%{prj.location}/**.c", "%{prj.location}/**.h", "%{prj.location}/**.cpp", "%{prj.location}/**.hpp" }

	filter "system:windows"
		defines { "GB_WINDOWS" }
	filter "system:macosx"
		defines { "GB_MACOSX", "GB_UNIX" }
	filter "system:linux"
		defines { "GB_MACOSX", "GB_UNIX" }

	filter "configurations:Debug"
		symbols "On"
		optimize "Off"
		defines { "GB_DEBUG" }
	filter "configurations:Release"
		symbols "On"
		optimize "Debug"
		defines { "GB_RELEASE" }
	filter "configurations:Dist"
		symbols "Off"
		optimize "Speed"
		defines { "GB_DIST" }

group "Tests"
project "Genesis Core-Tests"
	kind "ConsoleApp"
	location "%{wks.location}/Genesis/tests/"
	language "C++"
	systemversion "latest"
	cppdialect "C++20"
	debugdir("%{wks.location}/bin/"..outdir)
	targetdir("%{wks.location}/bin/"..outdir)
	objdir("%{wks.location}/bin-int/"..outdir)

	files { "%{prj.location}/**.c", "%{prj.location}/**.h", "%{prj.location}/**.cpp", "%{prj.location}/**.hpp" }

	filter "system:windows"
		defines { "GB_WINDOWS" }
	filter "system:macosx"
		defines { "GB_MACOSX", "GB_UNIX" }
	filter "system:linux"
		defines { "GB_MACOSX", "GB_UNIX" }

	filter "configurations:Debug"
		symbols "On"
		optimize "Off"
		defines { "GB_DEBUG" }
	filter "configurations:Release"
		symbols "On"
		optimize "Debug"
		defines { "GB_RELEASE" }
	filter "configurations:Dist"
		symbols "Off"
		optimize "Speed"
		defines { "GB_DIST" }

