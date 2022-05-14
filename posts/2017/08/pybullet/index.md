---
title: "PyBulletを使ってみる"
date: 2017-08-14
tags: []
---

BulletPhysicsの公式Pythonバインディングが出てたので使ってみる。

Windows10(64bit) + Python3.6
pip
> C:\Python36\Scripts\pip.exe install pybullet

cl.exe not found的な
msvc-14.0なコンパイラがインストールされているにも関わらず出るなら
これ
かもしれない
C:\Python36\Lib\distutils\_msvccompiler.pyを修正すればいけるかも。
    try:
        out = subprocess.check_output(
            'cmd /u /c "{}" {} && set'.format(vcvarsall, plat_spec),
            stderr=subprocess.STDOUT,
        ).decode('utf-16le', errors='replace')
        #######################################################################
        if out.startswith("Error in script usage"):
            out = subprocess.check_output(
                'cmd /u /c "{}" {} && set'.format("C:\\Program Files (x86)\\Microsoft Visual C++ Build Tools\\vcbuildtools.bat", plat_spec),
                stderr=subprocess.STDOUT,
            ).decode('utf-16le', errors='replace')
        #######################################################################
    except subprocess.CalledProcessError as exc:
        log.error(exc.output)
        raise DistutilsPlatformError("Error executing {}"
                .format(exc.cmd))

utf-8がどうこう的な
いい加減WindowsはCP932を使うのやめて欲しいのだけど。
chcp65001

インストールできた。
使ってみる

pybullet quickstart guide

日付が2017で思ったより新しい。むしろ、記述中くらいか。
hello pybullet
import pybullet as p
physicsClient = p.connect(p.GUI)#or p.DIRECT for non-graphical version
p.setGravity(0,0,-10)
planeId = p.loadURDF("plane.urdf")
cubeStartPos = [0,0,1]
cubeStartOrientation = p.getQuaternionFromEuler([0,0,0])
boxId = p.loadURDF("r2d2.urdf",cubeStartPos, cubeStartOrientation)
p.stepSimulation()
cubePos, cubeOrn = p.getBasePositionAndOrientation(boxId)
print(cubePos,cubeOrn)
p.disconnect()

plane.urdfはどこにあるのか。
bullet3のソースの中にあった。bullet3/build/data/plane.urdf
<?xml version="0.0" ?>
<robot name="plane">
  <link name="planeLink">
  <contact>
      <lateral_friction value="1"/>
  </contact>
    <inertial>
      <origin rpy="0 0 0" xyz="0 0 0"/>
       <mass value=".0"/>
       <inertia ixx="0" ixy="0" ixz="0" iyy="0" iyz="0" izz="0"/>
    </inertial>
    <visual>
      <origin rpy="0 0 0" xyz="0 0 0"/>
      <geometry>
                <mesh filename="plane.obj" scale="1 1 1"/>
      </geometry>
       <material name="white">
        <color rgba="1 1 1 1"/>
      </material>
    </visual>
    <collision>
      <origin rpy="0 0 0" xyz="0 0 -5"/>
      <geometry>
        <box size="30 30 10"/>
      </geometry>
    </collision>
  </link>
</robot>

なるほどー。
ちょっとhelloを改造
import os
os.chdir('D:/dev/_python/bullet3/build/data') # urdfのあるところに移動

import pybullet as p
physicsClient = p.connect(p.GUI)#or p.DIRECT for non-graphical version
p.setGravity(0,0,-10)
planeId = p.loadURDF("plane.urdf")
cubeStartPos = [0,0,1]
cubeStartOrientation = p.getQuaternionFromEuler([0,0,0])
boxId = p.loadURDF("r2d2.urdf",cubeStartPos, cubeStartOrientation)

while True: # とりあえずpythonを抜けないように
    p.stepSimulation()
    cubePos, cubeOrn = p.getBasePositionAndOrientation(boxId)
    print(cubePos,cubeOrn)

p.disconnect()


面白そう。
