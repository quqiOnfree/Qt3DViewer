cmake_minimum_required(VERSION 3.24)

project(Qt3DViewer VERSION 0.1 LANGUAGES CXX)



set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt5 COMPONENTS Core Widgets Gui OpenGL REQUIRED)

set(PROJECT_SOURCES
        main.cpp
		Qt3DViewer.cpp
		Qt3DViewer.h
		Qt3DViewer.ui
        Qt3DViewer.qrc
		openmeshApps/MeshViewerWidget.cpp
		openmeshApps/MeshViewerWidget.h
		openmeshApps/MeshViewerWidgetT.h
		openmeshApps/MeshViewerWidgetT_impl.h
		openmeshApps/QGLViewerWidget.h
		openmeshApps/QGLViewerWidget.cpp
)

add_definitions(-D_USE_MATH_DEFINES)

add_subdirectory(OpenMesh)

add_executable(Qt3DViewer
    ${PROJECT_SOURCES}
)

target_link_libraries(Qt3DViewer PRIVATE
    Qt5::Core
    Qt5::Widgets  
    Qt5::Gui
    Qt5::OpenGL
    OpenMeshCore
    OpenMeshTools
)
if (WIN32)
    target_link_libraries(Qt3DViewer PRIVATE OpenGL32)
endif()

if (MACOS)
    set_target_properties(Qt3DViewer PROPERTIES
        MACOSX_BUNDLE_GUI_IDENTIFIER my.example.com
        MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
        MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    )
endif()
