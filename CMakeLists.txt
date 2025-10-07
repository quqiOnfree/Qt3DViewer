cmake_minimum_required(VERSION 3.24)

project(Qt3DViewer VERSION 0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt6 COMPONENTS Core Widgets Gui OpenGL OpenGLWidgets REQUIRED)

add_subdirectory(OpenMesh)

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
	openmeshApps/QOpenGLViewerWidget.h
	openmeshApps/QOpenGLViewerWidget.cpp
)

add_definitions(-D_USE_MATH_DEFINES)

add_executable(Qt3DViewer
    ${PROJECT_SOURCES}
)

target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC
	${CMAKE_CURRENT_SOURCE_DIR}
	${OPENMESH_INCLUDE_DIRS}
)

target_link_libraries(Qt3DViewer
  Qt6::Core
  Qt6::Widgets  
  Qt6::Gui
  Qt6::OpenGL
  Qt6::OpenGLWidgets
  OpenMeshCore
  OpenMeshTools
)

if (WIN32)
	target_link_libraries(Qt3DViewer OpenGL32)
endif()

set_target_properties(Qt3DViewer PROPERTIES
    MACOSX_BUNDLE_GUI_IDENTIFIER my.example.com
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
)

message(STATUS "OpenMesh dir: ${OPENMESH_INCLUDE_DIRS}")
