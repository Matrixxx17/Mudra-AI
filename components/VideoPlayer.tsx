"use client"

import { useRef, useState } from "react"
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import { Video, ResizeMode, type AVPlaybackStatus } from "expo-av"
import { AntDesign } from "@expo/vector-icons"

interface VideoPlayerProps {
  uri: string
  height?: number
  autoPlay?: boolean
  loop?: boolean
}

export default function VideoPlayer({ uri, height = 250, autoPlay = true, loop = true }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null)
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isPlaying = status?.isLoaded ? status.isPlaying : false

  const handlePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pauseAsync()
    } else {
      videoRef.current.playAsync()
    }
  }

  const handleReplay = () => {
    if (!videoRef.current) return
    videoRef.current.replayAsync()
  }

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status)
    if (status.isLoaded && isLoading) {
      setIsLoading(false)
    }
  }

  return (
    <View style={[styles.container, { height }]}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={loop}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        shouldPlay={autoPlay}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleReplay} style={styles.controlButton}>
          <AntDesign name="reload1" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
          <AntDesign name={isPlaying ? "pausecircleo" : "playcircleo"} size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  controlButton: {
    padding: 8,
  },
})

